import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  let loggedIn = false;

  return (
    <div>
      {!loggedIn ? (
        <div>
          <div className="menu-bar">
            <Link to="/login">
              <div className="menu-dot-1">
                <p>login</p>
              </div>
            </Link>
            <Link to="/register">
              <div className="menu-dot-2">
                <p>register</p>
              </div>
            </Link>
            <Link to="/browser">
              <div className="menu-dot-3">
                <p>browse</p>
              </div>
            </Link>
            <div className="menu-dot-4">
              <p>color</p>
            </div>
          </div>
          <div className="nav-border"></div>
        </div>
      ) : (
        <div>
          <div className="menu-bar">
            <Link to="/logout">
              <div className="menu-dot-1">
                <p>logout</p>
              </div>
            </Link>
            <Link to="/account">
              <div className="menu-dot-2">
                <p>mypics</p>
              </div>
            </Link>
            <Link to="/browser">
              <div className="menu-dot-3">
                <p>browse</p>
              </div>
            </Link>
            <div className="menu-dot-4">
              <p>color</p>
            </div>
          </div>
          <div className="nav-border"></div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
