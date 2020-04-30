import React, {useContext, createContext, useReducer} from 'react';

const AppContext = createContext({
  loggedIn:false
})
const { Provider } = AppContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return{
        ...state,
        user: action.payload,
        loggedIn: true,
      };
    default:
      return state;
  }
};

const AppProvider = ({value = [], ...props}) => {
  const [state, dispatch] = useReducer(reducer, {});
  return <Provider value={[state, dispatch]} {...props}/>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext};