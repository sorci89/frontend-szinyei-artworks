import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Link to="/browser">
      <div className="login-dot">
        <p>THE MET</p> <p>image browser</p>
      </div>
    </Link>
  );
};

export default Landing;
