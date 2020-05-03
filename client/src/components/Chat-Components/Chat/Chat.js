import React, { useEffect } from 'react';
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

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    socket = io();
    dispatch({type:'SET_NAME', payload: name});
    dispatch({type:'SET_ROOM', payload: room});
    socket.emit('join', { name, room: room }, () => {
    });

    return () => {
      socket.emit('disconnect');
      socket.disconnect();
    }
  }, [location.search]);

  useEffect(() => {
    if (!state.user) {
      (async () => {
        const loggedInUser = await getLoggedInUser();
        dispatch({ type: "SET_USER", payload: loggedInUser });
      })();
    } else {
      (async () => {
        const allMessages = await getMessages(state.room);
        const messageArray = allMessages.map((m) => {
          return { text: m.message, user: m.sender}
        });
        dispatch({ type: "SET_MESSAGES", payload: messageArray});
      })();
    }
  },[state.user])

  useEffect(() => {
    if (state.user) {   
      (async () => {
        const allMessages = await getMessages(state.room);
        const messageArray = allMessages.map((m) => {
          return { text: m.message, user: m.sender}
        });
      })();
    }
    socket.on("message", message => {
      dispatch({type: "SET_MESSAGES", payload:message})
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (state.message) {
      socket.emit('sendMessage', state.message, () => dispatch({type:'SET_MESSAGE', payload:''}));
    }
  }
  if(state.user) {
    return (
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={state.room} />
          <Messages messages={state.messages} name={state.name} />
          <Input message={state.message} setMessage={(payload) => dispatch({ type:"SET_MESSAGE", payload })} sendMessage={sendMessage} />
        </div>
      </div>
    )
  }
  else {
    return <h1></h1>
  }
}

export default Chat;