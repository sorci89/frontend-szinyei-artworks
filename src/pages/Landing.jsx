import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hirst from "../components/Hirst";

const Landing = () => {
  const [next, swithNext] = useState(false);

  setTimeout(() => {
    swithNext(true);
  }, 4000);

  return (
    <div className="hirst-container-container">
      {!next ? (
        <Link to="/browser">
          <div className="login-dot">
            <p>THE MET</p> <p>image browser</p>
          </div>
        </Link>
      ) : (
        <Hirst />
      )}
    </div>
  );
};

export default Landing;
