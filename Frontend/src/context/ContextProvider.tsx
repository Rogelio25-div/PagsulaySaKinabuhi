// Import React hooks for managing state and context
import { createContext, useContext, useState } from "react";

// Create a new Context to share data (user, token, and functions) across components
const stateContext = createContext({
     user: null,        // initial user value (none yet)
     token: null,       // initial token value (none yet)
     setUser: () => {}, // placeholder function for updating user
     setToken: () => {},// placeholder function for updating token
});

// Create the ContextProvider component that wraps the app
export const ContextProvider = ({ children }) => {
     // Load the user from localStorage if it exists (keeps user logged in after refresh)
     const [user, setUser_] = useState(() => {
          const savedUser = localStorage.getItem("USER"); // get user from browser storage
          return savedUser ? JSON.parse(savedUser) : null; // convert string to object or return null
     });

     // Load the token from localStorage if it exists
     const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
     // const [token, _setToken] = useState({name:"rogelio"});

     // Function to update user data
     const setUser = (user) => {
          setUser_(user); // update React state
          if (user) {
               // if there’s a user, save it to localStorage as a string
               localStorage.setItem("USER", JSON.stringify(user));
          } else {
               // if user is null (logged out), remove it from localStorage
               localStorage.removeItem("USER");
          }
     };

     // Function to update token data
     const setToken = (token) => {
          _setToken(token); // update React state
          if (token) {
               // if there’s a token, save it in localStorage
               localStorage.setItem("ACCESS_TOKEN", token);
          } else {
               // if token is null (logged out), remove both token and user data
               localStorage.removeItem("ACCESS_TOKEN");
               localStorage.removeItem("USER");
          }
     };

     // Provide all values and functions to the components inside this provider
     return (
          <stateContext.Provider value={{ user, token, setUser, setToken }}>
               {children} {/* Render any nested components */}
          </stateContext.Provider>
     );
};

// Custom hook to easily use the context anywhere in the app
export const useStateContext = () => useContext(stateContext);
