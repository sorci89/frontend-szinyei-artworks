import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  let active = props.active;

  const [isActive, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));

    setActive(active);
  }, []);

  return (
    <div>
      {!loggedIn ? (
        <div>
          <div className="menu-bar">
            <div className="menu-left">
              <Link to="/browser">
                <div
                  className={
                    isActive === 1
                      ? "menu-item item-1 selected"
                      : "menu-item item-1"
                  }
                >
                  <p>BROWSE</p>
                </div>
              </Link>
            </div>
            <div className="menu-middle">
              <div className="logo"></div>
            </div>
            <div className="menu-right">
              <Link to="/login">
                <div
                  className={
                    isActive === 2
                      ? "menu-item item-2 selected"
                      : "menu-item item-2"
                  }
                >
                  <p>LOGIN</p>
                </div>
              </Link>
              <Link to="/register">
                <div
                  className={
                    isActive === 3
                      ? "menu-item item-3 selected"
                      : "menu-item item-3"
                  }
                >
                  <p>REGISTER</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="nav-border"></div>
        </div>
      ) : (
        <div>
          <div className="menu-bar">
            <div className="menu-left">
              <Link to="/browser">
                <div
                  className={
                    isActive === 1
                      ? "menu-item item-1 selected"
                      : "menu-item item-1"
                  }
                >
                  <p>BROWSE</p>
                </div>
              </Link>

              <Link to="/account">
                <div
                  className={
                    isActive === 2
                      ? "menu-item item-2 selected"
                      : "menu-item item-2"
                  }
                >
                  <p>MY GALLERY</p>
                </div>
              </Link>
            </div>
            <div className="menu-middle">
              <div className="logo"></div>
            </div>
            <div className="menu-right">
              <button
                className="menu-item item-3"
                onClick={() => {
                  localStorage.clear();
                  setLoggedIn(false);
                  navigate("/login");
                  setTimeout(() => {
                    navigate("/browser");
                  }, 1);
                }}
              >
                <p>LOGOUT</p>
              </button>
            </div>
          </div>
          <div className="nav-border"></div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
