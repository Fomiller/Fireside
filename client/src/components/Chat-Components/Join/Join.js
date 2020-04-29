import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../utils/GlobalContext';
import './Join.css';

const Join = () => {
  const [state, dispatch] = useAppContext()
  const [room, setRoom] = useState('');


  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
        <Link onClick={event => (!room) ? event.preventDefault() : null} to={`/chat?name=${state.user.username}&room=${room}`}>
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}

export default Join;