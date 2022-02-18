import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const LoginForm = () => {
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [logErrors, setLogErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState("");

  const loginValidation = () => {
    setLogErrors({});
    console.log(authUsername, authPassword);
    let logErrors = {};
    logErrors.empty = true;

    if (!authUsername) {
      logErrors.authUsername = "Username is required!";
      logErrors.empty = false;
    } else if (authUsername.length < 5) {
      logErrors.authUsername = "Username must be more than 5 character!";
      logErrors.empty = false;
    }

    if (!authPassword) {
      logErrors.authPassword = "Password is required!";
      logErrors.empty = false;
    } else if (authPassword.length < 5) {
      logErrors.authPassword = "Password must be more than 5 character!";
      logErrors.empty = false;
    }
    console.log(logErrors);
    if (!logErrors.empty) {
      console.log("Hiba");
      setLogErrors(logErrors);
    } else {
      console.log("ok");
      login();
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3101/api/user/login",
        {},
        {
          headers: {
            Authorization: authUsername + "&&&" + authPassword,
          },
        }
      );
      localStorage.setItem("user", authUsername);
      localStorage.setItem("pw", authPassword);
      localStorage.setItem("loggedIn", true);
      setLoggedIn(true);
      console.log("válasz ok");
    } catch (e) {
      alert("wrong username/password");
    }
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
  }, [loggedIn]);

  return (
    <div className="regstration">
      {!loggedIn ? (
        <div>
          <h1>Login</h1>
          <hr />
          {logErrors.authUsername && (
            <p className="error">{logErrors.authUsername}</p>
          )}
          <input
            type="text"
            onChange={(e) => {
              setAuthUsername(e.target.value);
            }}
            value={authUsername}
            placeholder="Username"
          ></input>
          {logErrors.authPassword && (
            <p className="error">{logErrors.authPassword}</p>
          )}
          <input
            type="password"
            onChange={(e) => {
              setAuthPassword(e.target.value);
            }}
            value={authPassword}
            placeholder="Password"
          ></input>
          <button onClick={(e) => loginValidation()}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Hi,you're logged in!</h1>
          <button
            onClick={(e) => {
              setAuthUsername("");
              setAuthPassword("");
              localStorage.clear();
              setLoggedIn(false);
              console.log(loggedIn);
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
