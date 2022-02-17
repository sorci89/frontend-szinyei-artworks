import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SelectMenu from '../components/SelectMenu';

const Navbar = () => {
  let loggedIn = false;

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

  return (
    <div>
      {!loggedIn ? (
        <div>
          <div className='menu-bar'>
            <Link to='/login'>
              <div className='menu-dot-1'>
                <p>login</p>
              </div>
            </Link>
            <Link to='/register'>
              <div className='menu-dot-2'>
                <p>register</p>
              </div>
            </Link>
            <Link to='/browser'>
              <div className='menu-dot-3'>
                <p>browse</p>
              </div>
            </Link>
            <div className='menu-dot-4'>
              <SelectMenu />
            </div>
          </div>
          <div className='nav-border'></div>
        </div>
      ) : (
        <div>
          <div className='menu-bar'>
            <Link to='/logout'>
              <div className='menu-dot-1'>
                <p>logout</p>
              </div>
            </Link>
            <Link to='/account'>
              <div className='menu-dot-2'>
                <p>mypics</p>
              </div>
            </Link>
            <Link to='/browser'>
              <div className='menu-dot-3'>
                <p>browse</p>
              </div>
            </Link>
            <div className='menu-dot-4'></div>
          </div>
          <div className='nav-border'></div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
