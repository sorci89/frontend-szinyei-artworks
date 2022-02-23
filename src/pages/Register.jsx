import React from "react";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div>
      <Navbar active={3} />
      <RegisterForm />
    </div>
  );
};

export default Register;
