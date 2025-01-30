import React from 'react';
import logo from '../SoccerIQ.png'; 
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements';
import './Navbar.css'; // Import CSS

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={logo} alt="SoccerIQ Logo" className="nav-logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/' activeStyle>Home</NavLink>
          <NavLink to='/feature1' activeStyle>Team Analysis</NavLink>
          <NavLink to='/feature2' activeStyle>Suited Player</NavLink>
          <NavLink to='/feature3' activeStyle>Dream Team</NavLink>
          <NavLink to='/feature4' activeStyle>Scout</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
