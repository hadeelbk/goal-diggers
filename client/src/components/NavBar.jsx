import React from "react";
import { GiSoccerBall } from "react-icons/gi";

function NavBar () {
  return (
  <div id='navBar'>
    <div id='logo'>
      <h1><GiSoccerBall style={{ color: 'gold' }} />GOAL Diggers</h1>
    </div>
    <div className='navBarButtons'>
      <button id='register'>Register</button>
      <button id='signIn'>Sign In</button>
    </div>
  </div>
    
  )
}

export default NavBar