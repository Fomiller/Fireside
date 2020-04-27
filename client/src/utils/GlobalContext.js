import React, {useContext, createContext, useReducer} from 'react';


const AppContext = createContext()
const { Provider } = AppContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return{
        ...state,
        darkMode: action.payload
      };
    default:
      return state;
  }
};

const AppProvider = ({value = [], ...props}) => {
  const [state, dispatch] = useReducer(reducer, {
    darkMode:true,
    user: {
      name:"Forrest Miller",
      email: "Forrest@test.com",
      password: "password1234",
      signedIn: false,
      avatar:"",
      directMessages: [],
      friends: [
        {
          name:"Mike Jones",
          avatar:"",
        },
        {
          name:"Jimmy John",
          avatar:"",
        }
      ],
      chatRooms: [
        {
          name:"Test Chat",
          messages: [
            {
              user: "Mike Jones",
              body:"This is a sample message. The quick foxed jumped over the lazy dog."
            }
          ]
        }
      ],
    }
  });
  return <Provider value={[state, dispatch]} {...props}/>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext};