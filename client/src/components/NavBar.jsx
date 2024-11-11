import { NavLink } from "react-router-dom";


function NavBar () {
  return (
  <div id='navBar'>
    <div id='logo'>
      <img src="https://cdn-icons-png.flaticon.com/128/2642/2642160.png" alt="Pitch icon" className='logo'/><p>GOAL Diggers</p>
    </div>
    <div className='navBarButtons'>
      <NavLink to='/users/register'>
        <button id='register' style={{ cursor: "pointer" }}>Register</button>
      </NavLink>
      <NavLink to='/users/login'>
        <button id='signIn' style={{ cursor: "pointer" }}>Sign In</button>
      </NavLink>
    </div>
  </div>
    
  )
}

export default NavBar