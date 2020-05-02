import React, { useContext, createContext, useReducer } from 'react';
import {logout} from './API';
const AppContext = createContext({
  name:'',
  room: '',
  message:'',
  messages: [],
  user:null,
})
const { Provider } = AppContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      };
      case "LOGOUT":
        logout();
        return {
          ...state,
          user: null
        };
      case "SET_NAME":
        return {
          ...state,
          name: action.payload
        };
      case "SET_ROOM":
        return {
          ...state,
          room: action.payload
        };
      case "SET_MESSAGE":
        return {
          ...state,
          message: action.payload
        };
      case "CLEAR_MESSAGES":
        return {
          ...state,
          messages: action.payload
        };
      case "SET_MESSAGES":
        if (state.messages) {
          return {
            ...state,
            messages: state.messages.concat(action.payload)
          };
        }
        return state;
    default:
      return state;
  }
};

const AppProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    name:'',
    room: '',
    message:'',
    messages: [],
    user:null,
  });
  return <Provider value={[state, dispatch]} {...props} />;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };