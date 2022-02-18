import React from "react";
import { useState } from 'react';
import axios from 'axios';




const LoginForm = (props) => {

  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [logErrors, setLogErrors] = useState({});

  const loginValidation = () => {
    setLogErrors({});
    let logErrors = {};
    logErrors.empty= true;

    if (!authUsername) {
      logErrors.authUsername="Username is required!";
      logErrors.empty= false;
    }else if (authUsername.length < 5) {
      logErrors.authUsername="Username must be more than 5 character!";
      logErrors.empty= false;
    }

    if (!authPassword) {
      logErrors.authPassword="Password is required!";
      logErrors.empty= false;
    }else if (authPassword.length < 5) {
      logErrors.authPassword="Password must be more than 5 character!";
      logErrors.empty= false;
    }
    console.log(logErrors);
    if (!logErrors.empty) {
      console.log("Hiba");
      setLogErrors(logErrors);
    }else{
      console.log("ok");
      login();
    }
  }




  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3101/api/user/login', {}, {
        headers: {
          'Authorization': authUsername + '&&&' + authPassword
        }
      })
      localStorage.setItem("user", authUsername);
      localStorage.setItem("pw", authPassword);
      localStorage.setItem("loggedIn", true);
      console.log("válasz ok");
    }
    catch (e) {
      alert("wrong username/password");
    }

  }


























  return (
    <div className="regstration">
        <h1>Login</h1>
        <hr/>
        {logErrors.authUsername && <p className="error">{logErrors.authUsername}</p>}
        <input  type="text" 
                onChange={(e) => {setAuthUsername(e.target.value)}} 
                value={authUsername} 
                placeholder="Username"></input>
        {logErrors.authPassword && <p className="error">{logErrors.authPassword}</p>}
        <input  type="password" 
                onChange={(e) => {setAuthPassword(e.target.value)}} 
                value={authPassword} 
                placeholder="Password"></input>
        <button onClick={(e) => loginValidation()}>Login</button>   
        <button onClick={(e) => { setAuthUsername(''); setAuthPassword(''); localStorage.clear() }}>Log out</button> 
    </div>
  );
};

export default LoginForm;