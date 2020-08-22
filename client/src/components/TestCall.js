import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Peer from 'simple-peer';

import io from 'socket.io-client';

import { AuthenticationContext } from './AuthenticationContext';

import { isContainingData, toArray } from '../utils/index';

const socket = io.connect('http://localhost:4000');

function TestCall() {
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
  }, [])

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
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    )
  }

  return (
    <VideoGrid>
      {UserVideo}
      {PeerVideo}
      <div>
        {isContainingData(userData) && toArray(users).map(([socketID, memberData], index) => {
          const { userID: memberID, email } = memberData;

          if (memberID === userData.userID) {
            return null;
          }
          return (
            <button
              key={`callButton${index}`}
              onClick={() => callPeer(socketID)}
            >
              Call {email}
            </button>
          );
        })}
      </div>
      <div>
        {incomingCall}
      </div>
    </VideoGrid>
  )
}

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  gird-auto-rows: 300px;
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export default TestCall;
