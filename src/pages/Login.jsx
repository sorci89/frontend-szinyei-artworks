import React from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div>
      <Navbar active={2} />
      <LoginForm />
    </div>
  );
};

export default Login;
