import React, { useState } from 'react';
import logo from '../SoccerIQ.png'; 
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={logo} alt="SoccerIQ Logo" className="nav-logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/' activeStyle>Home</NavLink>
          
          {/* Dropdown Menu */}
          <div 
            className="nav-dropdown" 
            onMouseEnter={() => setDropdownOpen(true)} 
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="dropdown-btn">Explore Features ▾</button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <NavLink to='/feature1'>Team Analysis</NavLink>
                <NavLink to='/feature2'>Suited Player</NavLink>
                <NavLink to='/feature3'>Dream Team</NavLink>
                <NavLink to='/feature4'>Scout</NavLink>
              </div>
            )}
          </div>

        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
