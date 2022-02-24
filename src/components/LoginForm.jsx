import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [logErrors, setLogErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState('');

  let navigate = useNavigate();

  const loginValidation = () => {
    setLogErrors({});

    let logErrors = {};
    logErrors.empty = true;
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!authUsername) {
      logErrors.authUsername = 'Username is required!';
      logErrors.empty = false;
    } else if (authUsername.length < 5) {
      logErrors.authUsername = 'Username must be more than 5 character!';
      logErrors.empty = false;
    } else if (authUsername.length > 31) {
      logErrors.authUsername = 'The username can be up to 30 characters long!';
      logErrors.empty = false;
    } else if (/\s/.test(authUsername)) {
      logErrors.authUsername = 'The username cannot contain white space!';
      logErrors.empty = false;
    } else if (format.test(authUsername)) {
      logErrors.authUsername =
        'The username cannot contain special characters!';
      logErrors.empty = false;
    }

    if (!authPassword) {
      logErrors.authPassword = 'Password is required!';
      logErrors.empty = false;
    } else if (authPassword.length < 5) {
      logErrors.authPassword = 'Password must be more than 5 character!';
      logErrors.empty = false;
    }

    if (!logErrors.empty) {
      setLogErrors(logErrors);
    } else {
      login();
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3101/api/user/login',
        {},
        {
          headers: {
            Authorization: authUsername + '&&&' + authPassword,
          },
        }
      );
      localStorage.setItem('SessionID', response.data);
      localStorage.setItem('loggedIn', true);
      setLoggedIn(true);
    } catch (e) {
      alert('wrong username/password');
    }
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn'));
  }, [loggedIn]);

  return (
    <div className='login'>
      {!loggedIn ? (
        <div>
          <h1>Login</h1>
          <hr />
          {logErrors.authUsername && (
            <p className='error'>{logErrors.authUsername}</p>
          )}
          <input
            type='text'
            onChange={(e) => {
              setAuthUsername(e.target.value);
            }}
            value={authUsername}
            placeholder='Username'
          ></input>
          {logErrors.authPassword && (
            <p className='error'>{logErrors.authPassword}</p>
          )}
          <input
            type='password'
            onChange={(e) => {
              setAuthPassword(e.target.value);
            }}
            value={authPassword}
            placeholder='Password'
          ></input>
          <button onClick={(e) => loginValidation()}>Login</button>
        </div>
      ) : (
        navigate('/browser')
        // <div>
        //   <h1>Hi,you're logged in!</h1>
        //   <button
        //     onClick={(e) => {
        //       setAuthUsername("");
        //       setAuthPassword("");
        //       localStorage.clear();
        //       setLoggedIn(false);
        //       console.log(loggedIn);
        //     }}
        //   >
        //     Log out
        //   </button>
        // </div>
      )}
    </div>
  );
};

export default LoginForm;
