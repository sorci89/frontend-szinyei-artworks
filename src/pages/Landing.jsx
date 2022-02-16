import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hirst from "../components/Hirst";

const Landing = () => {
  const [next, swithNext] = useState(false);

  setTimeout(() => {
    swithNext(true);
  }, 6000);

  return (
    <div className="hirst-container-container">
      {!next ? (
        <Link to="/browser">
          <div className="login-dot">
            <p>Harvard Art Museum</p> <p>image browser</p>
          </div>
        </Link>
      ) : (
        <Link to="/browser">
          <Hirst />
        </Link>
      )}
    </div>
  );
};

export default Landing;
