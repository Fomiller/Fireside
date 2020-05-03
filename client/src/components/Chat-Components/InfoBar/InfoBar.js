import React from 'react';
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'
import './InfoBar.css'
import {Link} from 'react-router-dom';
import { useAppContext } from '../../../utils/GlobalContext';

export default function InfoBar ({ room }) {
  const [state, dispatch] = useAppContext();

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online image" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <Link to={process.env.PUBLIC_URL + `/user/${state.user.id}`}>
          <img src={closeIcon} alt="close image" />
        </Link>
      </div>
    </div>
  );
} 
