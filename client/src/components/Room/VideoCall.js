import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Peer from 'peerjs';
import io from 'socket.io-client';

import { IoIosCall } from 'react-icons/io';

import { AuthenticationContext } from '../AuthenticationContext';

import { isContainingData, toArray } from '../../utils/index';

const socket = io.connect('http://localhost:4000');

function VideoCall() {
  const {
    userData,
  } = useContext(AuthenticationContext);

  const { roomID } = useParams();

  const [peerConnection, setPeerConnection] = useState(null);
  const [userStream, setUserStream] = useState();
  const [callStarted, setCallStarted] = useState(false);
  // const [receivingCall, setReceivingCall] = useState(false);
  // const [caller, setCaller] = useState('');
  // const [callerSignal, setCallerSignal] = useState();
  // const [callAccepted, setCallAccepted] = useState(false);
  const [allUsers, setAllUsers] = useState({});

  const [peerStreams, setPeerStreams] = useState([]);

  const videoElementRefs = useRef([]);

  useEffect(() => {
    if (isContainingData(userData)) {
      const { userID } = userData;

      socket.emit('join-room');
      socket.on('room-status', callStarted => {
        if (callStarted) setCallStarted('join');
      });


      const newPeerConnection = new Peer(userID, {
        host: '/',
        port: '3001'
      });

      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(userStream => {
        setUserStream(userStream);
      });

      setPeerConnection(newPeerConnection);
    }
    // eslint-disable-next-line
  }, [userData]);

  const startCall = () => {
    setCallStarted(true);
    socket.emit('call-started', roomID, userData);
    socket.emit('join-call', roomID, userData);

    socket.on('user-connected', ({ allUsers: newUsers, newUserID }) => {
      setAllUsers(newUsers);
      if (newUserID !== userData.userID) connectToPeer(newUserID)
    });

    peerConnection.on('call', call => {
      call.answer(userStream);

      call.on('stream', peerStream => {
        addPeerStream(peerStream)
      })
    });
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(userStream => {
      setUserStream(userStream);
    });
  }

  const joinCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(userStream => {
      setUserStream(userStream);
    });

    setCallStarted(true)

    socket.emit('join-call', roomID, userData);

    socket.on('user-connected', ({ allUsers: newUsers }) => {
      setAllUsers(newUsers);
    });

    peerConnection.on('call', call => {
      call.answer(userStream);

      call.on('stream', peerStream => {
        addPeerStream(peerStream)
      })
    });
  }

  const createVideoElement = (stream, index, muted = false) => {
    const videoElement = (
      <Video
        key={`peerStream${index}`}
        playsInline ref={element => videoElementRefs.current[index] = element}
        autoPlay
        muted={muted}
      />
    )

    if (videoElementRefs.current[index]) {
      videoElementRefs.current[index].srcObject = stream;
    }

    return videoElement;
  }

  // connect to peer by calling THEIR peerID and sending USER stream
  const connectToPeer = peerID => {
    const call = peerConnection.call(peerID, userStream);

    call.on('stream', peerStream => {
      addPeerStream(peerStream)
    });

    call.on('close', () => {

    });
  }

  const addPeerStream = peerStream => {
    setPeerStreams([...peerStreams, peerStream]);
  }

  if (callStarted === 'join') {
    return (
      <CallButton onClick={joinCall}>
          Join Call
      </CallButton>
    )
  }
  else if (callStarted) {
    return (
      <Wrapper>
        {createVideoElement(userStream, 0, true)}
        {peerStreams.map((peerStream, index) => {
          return (
            createVideoElement(peerStream, index + 1) // user video is index 0
          )
        })}
      </Wrapper>
    )
  }
  else if (peerConnection) {
    return (
      <CallButton onClick={startCall}>
        <IoIosCall />
        Start Call
      </CallButton>
    )
  }
  else {
    return (
      <div></div>
    )
  }
}

const Wrapper = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 300px;
  margin: 30px 30px;
`;

const StyledButton = styled.button`
  height: 500px;
  width: 500px;
  background-color: purple;
  border: 1px solid black;
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const CallButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  height: 60px;
  min-width: 250px;
  padding: 30px 15px;
  background-color: #00C851;
  font-size: 1.3em;
  border-radius: 15px;

  svg {
    font-size: 1.5em;
    margin-right: 10px;
  }
`;

const IncomingCall = styled.div`
  height: 50px;
  min-width: 250px;
  background-color: blue;
`;

export default VideoCall;
