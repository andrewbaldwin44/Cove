import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Peer from 'peerjs';
import io from 'socket.io-client';

import { VscCallOutgoing, VscCallIncoming } from 'react-icons/vsc';

import Call from './Call';
import CallButton from './CallButton';

import { AuthenticationContext } from '../../AuthenticationContext';

import { isContainingData } from '../../../utils/index';

const socket = io.connect('http://localhost:4000');

const allConnections = {};

function VideoCall() {
  const {
    userData,
  } = useContext(AuthenticationContext);

  const { roomID } = useParams();

  const [peerConnection, setPeerConnection] = useState(null);
  const [userStream, setUserStream] = useState();
  const [callStarted, setCallStarted] = useState(false);
  const [allUsers, setAllUsers] = useState({});

  const [peerStreams, setPeerStreams] = useState([]);

  const videoElementRefs = useRef([]); // holds a reference to every video stream

  useEffect(() => {
    if (isContainingData(userData)) {
      const { userID } = userData;

      socket.emit('join-room', roomID, userData);

      const newPeerConnection = new Peer(userID, {
        path: '/peerjs',
        host: '/',
        port: '4000',
      });

      socket.on('room-status', callStarted => {
        if (callStarted) setCallStarted('join');
        else setCallStarted(false)
      });

      socket.on('user-disconnected', userID => {
        if (allConnections[userID]) {
          allConnections[userID].close();
        }
      })

      setPeerConnection(newPeerConnection);
    }
    // eslint-disable-next-line
  }, [userData]);


  const startCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(userStream => {
      setUserStream(userStream);

      setCallStarted(true);
      socket.emit('call-started');
      socket.emit('join-call');

      peerConnection.on('call', call => {
        call.answer(userStream);

        call.on('stream', peerStream => {
          addPeerStream(peerStream)
        })
      });
    });
  }

  const joinCall = () => {
    const { photoURL } = userData;
    setCallStarted(true);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(userStream => {
      setUserStream(userStream);

      socket.emit('join-call');

      peerConnection.on('call', call => {
        call.answer(userStream);

        call.on('stream', peerStream => {
          addPeerStream(peerStream)
        })
      });
    });
  }

  useEffect(() => {
    if (isContainingData(userData)) {

      socket.on('user-connected', ({ allUsers: newUsers, newUserID }) => {
        setAllUsers(newUsers);
        if (newUserID !== userData.userID) connectToPeer(newUserID);
      });
    }

  }, [userStream, userData]);

  // connect to peer by calling THEIR peerID and sending USER stream
  const connectToPeer = peerID => {
    if (!peerConnection) {
      setTimeout(() => {
        connectToPeer(peerID);
      }, 500);

      return;
    }

    const call = peerConnection.call(peerID, userStream);

    call.on('stream', peerStream => {
      addPeerStream(peerStream)
    });

    call.on('close', () => {
      console.log(peerStreams.find(stream => stream === userStream));
    });

    allConnections[peerID] = call;
  }

  const addPeerStream = peerStream => {
    setPeerStreams([...peerStreams, peerStream]);
  }

  const createVideoElement = (stream, index, muted = false, height) => {
    const videoElement = (
      <Video
        key={`peerStream${index}`}
        playsInline ref={element => videoElementRefs.current[index] = element}
        autoPlay
        muted={muted}
        height={height}
      />
    )

    if (videoElementRefs.current[index]) {
      videoElementRefs.current[index].srcObject = stream;
    }

    return videoElement;
  }

  if (callStarted === 'join') {
    return (
      <CallButton
        icon={<VscCallIncoming />}
        text={'Join Call'}
        callBack={joinCall}
      />
    )
  }
  else if (callStarted) {
    return (
      <Call
        createVideoElement={createVideoElement}
        userStream={userStream}
        peerStreams={peerStreams}
      />
    )
  }
  else if (peerConnection) {
    return (
      <CallButton
        icon={<VscCallOutgoing />}
        text={'Start Call'}
        callBack={startCall}
      />
    )
  }
  else {
    return null;
  }
}

const Video = styled.video`
  height: ${({ height }) => height || '180px'};
  width: 100%;

  border: 1px solid lightblue;
  object-fit: cover;

  box-shadow: -2px -2px 8px var(--dark-shadow),
              4px 4px 5px var(--dark-shadow);
`;

export default VideoCall;
