import React from "react";
import { useState } from 'react';
import axios from 'axios';




const RegisterForm = (props) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regErrors, setRegErrors] = useState({});
  const [successful, setSuccessful] = useState("");
  const [alreadyExist, setAlreadyExist] = useState("");



const validation = () => {
  setSuccessful("");
    let Errors = {};
    Errors.empty= true;

    if (!username) {
        Errors.username="Username is required!";
        Errors.empty= false;
        setAlreadyExist('');
    }else if (username.length < 5) {
        Errors.username="Username must be more than 5 character!";
        Errors.empty= false;
        setAlreadyExist('');
    }



    if (!email) {
        Errors.email="Email is required!";
        Errors.empty= false;
        setAlreadyExist('');
    }else if(!/\S+@\S+\.\S+/.test(email)){
        Errors.email="Email is invalid!";
        Errors.empty= false;
        setAlreadyExist('');
    }



    if (!password) {
        Errors.password="Password is required!";
        Errors.empty= false;
        setAlreadyExist('');
    }else if (password.length < 5) {
        Errors.password="Password must be more than 5 character!";
        Errors.empty= false;
        setAlreadyExist('');
    }
    console.log(Errors);
    if (!Errors.empty) {
      console.log("Hiba");
      setRegErrors(Errors);
    }else{
      console.log("ok");
      signup();
    }
}


  const signup = async () => {
    try {
      const response = await axios.post('http://localhost:3101/api/user/reg', {username , email , password});
      setUsername('');
      setPassword('');
      setEmail('');
      setSuccessful("Successful Sign in!");
      setRegErrors({});
      setAlreadyExist('');
    } catch (error) {
      if(error.response.status === 400){
        alert('Missing datas!');
      }else if (error.response.status === 409){
        setAlreadyExist('Username or Email already exist');
        setUsername('');
        setPassword('');
        setEmail('');
      }
    }
  }




  return (
    <div className="regstration">
        <h1>Registration</h1>
        <hr/>
        {successful && <p className="successful">{successful}</p>}
        {alreadyExist && <p className="error">{alreadyExist}</p>}
        {regErrors.username && <p className="error">{regErrors.username}</p>}
        <input  type="text" 
                onChange={(e) => {setUsername(e.target.value)}} 
                value={username} 
                placeholder="Username"></input>
        {regErrors.email && <p className="error">{regErrors.email}</p>}
        <input  type="email" 
                onChange={(e) => {setEmail(e.target.value)}} 
                value={email} 
                placeholder="Email"></input>
        {regErrors.password && <p className="error">{regErrors.password}</p>}
        <input  type="password" 
                onChange={(e) => {setPassword(e.target.value)}} 
                value={password} 
                placeholder="Password"></input>
        <button onClick={(e) => validation()}> SIGN UP!</button>    
    </div>
  );
};

export default RegisterForm;