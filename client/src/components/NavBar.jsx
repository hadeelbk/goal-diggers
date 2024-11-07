import React from "react";
import { GiSoccerBall } from "react-icons/gi";

function NavBar () {
  return (
  <div id='navBar'>
    <div id='logo'>
      <img src="https://cdn-icons-png.flaticon.com/128/2642/2642160.png" alt="Pitch icon" className='logo'/><p>GOAL Diggers</p>
    </div>
    <div className='navBarButtons'>
      <button id='register'>Register</button>
      <button id='signIn'>Sign In</button>
    </div>
  </div>
    
  )
}

export default NavBar