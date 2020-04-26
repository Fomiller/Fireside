import React, {useContext} from "react";
import {useAppContext} from '../utils/GlobalContext';

export default function User() {
  const [state, dispatch] = useAppContext();
  console.log('STATE: ', state);

  return(
    <div>User</div>
  )
};