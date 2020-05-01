import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import { useAppContext } from '../../../utils/GlobalContext';
import { getMessages, getLoggedInUser } from '../../../utils/API';

let socket;

const Chat = (props) => {
  const { location } = props;
  const [state, dispatch] = useAppContext();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const ENDPOINT = 'localhost:5000';
  const ENDPOINT = process.env.PUBLIC_URL || 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    socket.emit('join', { name, room: room }, () => {

    });

    return () => {
      socket.emit('disconnect');
      socket.disconnect();
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    if (!state.user) {
      (async () => {
        const loggedInUser = await getLoggedInUser();
        dispatch({ type: "SET_USER", payload: loggedInUser });
      })();
    }    
  }, []);

  useEffect(() => {
    if (state.loggedIn) {   
      (async () => {
        const allMessages = await getMessages(room);
        const messageArray =[]
        allMessages.forEach((m) => {
          messageArray.push({ text: m.message, user: m.sender})
        })
        dispatch({ type: "SET_MESSAGES", payload: messageArray });
        setMessages(messages => [...messages, ...messageArray]);
      })();
    }
  }, [state.loggedIn]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default Chat;