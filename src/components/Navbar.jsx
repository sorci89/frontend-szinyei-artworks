import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  let active = props.active;

  const [isActive, setActive] = useState(0);
  const navigate = useNavigate();

  //   const themeState = [
  //     { id: 0, value: '#fff', text: 'Change' },
  //     { id: 1, value: '#a7cfe6', text: 'blue' },
  //     { id: 2, value: '#abdd98', text: 'green' },
  //     { id: 3, value: '#92264d', text: 'red' },
  //   ];

  //   const [theme, setTheme] = useState([]);
  //   const [color, setColor] = useState(themeState[0].value);

  //   const getColor = (color) => {
  //     console.log('color', color);
  //     if (color === themeState[1].text) setColor(themeState[1].value);
  //     else if (color === themeState[2].text) setColor(themeState[2].value);
  //     else setColor(themeState[0].value);
  //   };

  //   useEffect(() => {
  //     setTheme(themeState);
  //   }, []);

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
                  navigate("/");
                  setTimeout(() => {
                    navigate("/browser");
                  }, 10);
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
