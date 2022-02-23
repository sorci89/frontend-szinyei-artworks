import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [regErrors, setRegErrors] = useState({});
  const [successful, setSuccessful] = useState("");
  const [alreadyExist, setAlreadyExist] = useState("");

  let navigate = useNavigate();

  const validation = () => {
    setSuccessful("");
    let Errors = {};
    Errors.empty = true;
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!username) {
      Errors.username = "Username is required!";
      Errors.empty = false;
      setAlreadyExist("");
    } else if (username.length < 5) {
      Errors.username = "Username must be more than 5 character!";
      Errors.empty = false;
      setAlreadyExist("");
    } else if (username.length > 31) {
      Errors.username = "The username can be up to 30 characters long!";
      Errors.empty = false;
      setAlreadyExist("");
    } else if (/\s/.test(username)) {
      Errors.username = "The username cannot contain white space!";
      Errors.empty = false;
      setAlreadyExist("");
    } else if (format.test(username)) {
      Errors.username = "The username cannot contain special characters!";
      Errors.empty = false;
      setAlreadyExist("");
    }

    if (!email) {
      Errors.email = "Email is required!";
      Errors.empty = false;
      setAlreadyExist("");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Errors.email = "Email is invalid!";
      Errors.empty = false;
      setAlreadyExist("");
    }

    if (!password) {
      Errors.password = "Password is required!";
      Errors.empty = false;
      setAlreadyExist("");
    } else if (password.length < 5) {
      Errors.password = "Password must be more than 5 character!";
      Errors.empty = false;
      setAlreadyExist("");
    }
    if (!passwordAgain) {
      Errors.passwordAgain = "Password is required!";
      Errors.empty = false;
      setAlreadyExist("");
    } else if (password.length < 5) {
      Errors.passwordAgain = "Password must be more than 5 character!";
      Errors.empty = false;
      setAlreadyExist("");
    }

    if (passwordAgain !== password) {
      Errors.passwordAgain = "The two passwords do not match!";
      Errors.empty = false;
      setAlreadyExist("");
    }

    console.log(Errors);
    if (!Errors.empty) {
      console.log("Hiba");
      setRegErrors(Errors);
    } else {
      console.log("ok");
      signup();
    }
  };

  const signup = async () => {
    try {
      const response = await axios.post(
        "http://ec2-3-123-23-184.eu-central-1.compute.amazonaws.com:3101/api/user/reg",
        {
          username,
          email,
          password,
        }
      );
      setUsername("");
      setPassword("");
      setPasswordAgain("");
      setEmail("");
      setSuccessful("Successful Sign in!");
      setRegErrors({});
      setAlreadyExist("");
      navigate("/Login");
    } catch (error) {
      if (error.response.status === 400) {
        alert("Missing datas!");
      } else if (error.response.status === 409) {
        setAlreadyExist("Username or Email already exist");
        setUsername("");
        setPassword("");
        setPasswordAgain("");
        setEmail("");
      }
    }
  };

  return (
    <div className="regstration">
      <h1>Registration</h1>
      <hr />
      {successful && <p className="successful">{successful}</p>}
      {alreadyExist && <p className="error">{alreadyExist}</p>}
      {regErrors.username && <p className="error">{regErrors.username}</p>}
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        placeholder="Username"
      ></input>
      {regErrors.email && <p className="error">{regErrors.email}</p>}
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        placeholder="Email"
      ></input>
      {regErrors.password && <p className="error">{regErrors.password}</p>}
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        placeholder="Password"
      ></input>
      {regErrors.passwordAgain && (
        <p className="error">{regErrors.passwordAgain}</p>
      )}
      <input
        type="password"
        onChange={(e) => {
          setPasswordAgain(e.target.value);
        }}
        value={passwordAgain}
        placeholder="Password Again"
      ></input>
      <button onClick={(e) => validation()}> SIGN UP!</button>
    </div>
  );
};

export default RegisterForm;
