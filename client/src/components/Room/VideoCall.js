import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Peer from 'simple-peer';
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

  const [userSocketID, setUserSocketID] = useState();
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSocketID, setCallerSocketID] = useState();
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideoSource = useRef();
  const peerVideoSource = useRef();

  useEffect(() => {
    if (isContainingData(userData)) {
      socket.emit('newConnection', { userData, roomID });
    }
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);

      if (userVideoSource.current) {
        userVideoSource.current.srcObject = stream;
      }
    });

    socket.on('socketID', (id) => {
      setUserSocketID(id);
    });

    socket.on('allUsers', (users) => {
      setUsers(users);
    });

    socket.on('incomingCall', ({ caller, callerSocketID, signal }) => {
      setReceivingCall(true);
      setCaller(caller);
      setCallerSocketID(callerSocketID);
      setCallerSignal(signal);
    });
  }, []);

  const callPeer = (socketID) => {
    const { email } = userData;

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', data => {
      socket.emit('callUser', {
        peerSocketID: socketID,
        signalData: data,
        userSocketID,
        caller: email,
      })
    });

    peer.on('stream', stream => {
      if (peerVideoSource.current) {
        peerVideoSource.current.srcObject = stream;
      }
    });

    socket.on('callAccepted', signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })
  }

  const acceptCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', data => {
      socket.emit('acceptCall', { peerSignal: data, callerSocketID })
    });

    peer.on('stream', stream => {
      peerVideoSource.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <Video playsInline muted ref={userVideoSource} autoPlay />
    );
  }

  let PeerVideo;
  if (callAccepted) {
    PeerVideo = (
      <Video playsInline ref={peerVideoSource} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <IncomingCall>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </IncomingCall>
    )
  }

  return (
    <Wrapper>
      {UserVideo}
      {PeerVideo}
      <div>
        {isContainingData(userData) && toArray(users).map(([socketID, memberData], index) => {
          const { userID: memberID, displayName, email } = memberData;

          if (memberID === userData.userID) {
            return null;
          }
          return (
            <CallButton
              key={`callButton${index}`}
              onClick={() => callPeer(socketID)}
              type='button'
            >
              <IoIosCall />
              Call {displayName || email}
            </CallButton>
          );
        })}
      </div>
      {incomingCall}
    </Wrapper>
  )
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
