import React from "react";
import { useState } from 'react';
import axios from 'axios';


const RegisterForm = (props) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const signup = async () => {
    try {
      const response = await axios.post('http://localhost:3101/api/user/reg', {username , email , password});
      setUsername('');
      setPassword('');
      setEmail('');
      alert('Successful registration');
    } catch (error) {
      if(error.response.status === 400){
        alert('missing credentials');
      }else if (error.response.status === 409){
        alert('Username or Email already exist');
      }
    }
  }




  return (
    <div className="regstration">
        <h1>Registration</h1>
        <input  type="text" 
                onChange={(e) => {setUsername(e.target.value)}} 
                value={username} 
                placeholder="Username"></input>
        <input  type="email" 
                onChange={(e) => {setEmail(e.target.value)}} 
                value={email} 
                placeholder="Email"></input>
        <input  type="password" 
                onChange={(e) => {setPassword(e.target.value)}} 
                value={password} 
                placeholder="Password"></input>
        <button onClick={(e) => signup()}> SIGN UP!</button>    
    </div>
  );
};

export default RegisterForm;