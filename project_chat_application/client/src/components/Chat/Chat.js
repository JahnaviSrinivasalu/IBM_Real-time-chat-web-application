import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import io from 'socket.io-client';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'http://localhost:5000'; // Change to your backend URL

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name: userName, room: userRoom } = queryString.parse(location.search);

    socket = io(ENDPOINT, { transports: ['websocket'] });

    setRoom(userRoom);
    setName(userName);

    socket.emit('join', { name: userName, room: userRoom }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.off('message');
      socket.off('roomData');
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message && socket) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

Chat.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Chat;
