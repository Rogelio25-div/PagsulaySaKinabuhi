import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from '../axiosClient.js';
import {useStateContext} from "../context/ContextProvider.tsx";
import  '../style/register.css';
import * as string_decoder from "node:string_decoder";

export default function Register(){

     const nameRef = useRef();
     const emailRef = useRef();
     const passwordRef = useRef();

     const {setUser,setToken} = useStateContext();

     // create a state to store error message
     const [error, setError] = useState("");

// function runs when the register form is submitted
     const submit = (ev) => {
          ev.preventDefault(); // stop the page from reloading
          setError(""); // clear any old error message

          // get the values from input fields
          const payload = {
               name: nameRef.current.value,
               email: emailRef.current.value,
               password: passwordRef.current.value,
          };

          // send the form data to the backend API
          axiosClient.post("/register", payload)
               .then(({ data }) => {

                    console.log(data);// check if it shows user + token

                    // if registration is successful, save the user and token
                    setUser(data.user);
                    setToken(data.token);
               })
               .catch((err) => {
                    // if the backend returns an error
                    const response = err.response;

                    // check if it's a validation error (status 422)
                    if (response && response.status === 422) {
                         const errors = response.data.errors;

                         // show specific error messages if they exist
                         if (errors.email) setError(errors.email[0]);
                         else if (errors.password) setError(errors.password[0]);
                         else if (errors.name) setError(errors.name[0]);
                    } else {
                         // show a general error message for other problems
                         setError("Something went wrong. Please try again.");
                    }
               });
     };


     return(
          <>
               <div className="login-signup-form animated fadeInDown">
                    <div className="form">
                         <h1 className="title">
                              Create new Account
                         </h1>
                         <form onSubmit={submit}>
                              <input ref={nameRef}type="name" placeholder="Name Here"/>
                              <input ref={emailRef} type="email" placeholder="Email Here"/>
                              <input ref={passwordRef} type="password" placeholder="Password Here"/>
                              <button className="btn btn-block">Login</button>
                              {error && <p style={{color: "red", marginTop: "8px"}}>{error}</p>}
                              <p className="message">
                                   Already have and Account? <Link to='/login'>Login</Link>
                              </p>
                         </form>
                    </div>
               </div>
          </>
     )
}

