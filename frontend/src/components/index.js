import React from 'react';
import { ReactComponent as logo } from "./logo.svg";


import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';


const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          SoccerIQ
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/feature1' activeStyle>
            Team Analysis
          </NavLink>
          <NavLink to='/feature2' activeStyle>
            Suited Player
          </NavLink>
          <NavLink to='/feature3' activeStyle>
            Dream Team
          </NavLink>
          <NavLink to='/feature4' activeStyle>
            Scout
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {/*<NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
  </NavBtn>*/}
      </Nav>

    </>
  );
};

export default Navbar;