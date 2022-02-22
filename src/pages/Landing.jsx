import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Landing = () => {
  let navigate = useNavigate();

  setTimeout(() => {
    navigate("/browser");
  }, 6000);

  return (
    <div className="hirst-container-container">
      <Link to="/browser">
        <div className="login-dot">
          <p></p> <p>image browser</p>
        </div>
      </Link>
    </div>
  );
};

export default Landing;
