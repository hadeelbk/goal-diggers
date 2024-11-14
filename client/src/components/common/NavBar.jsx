import { NavLink } from "react-router-dom";
import { UsersContext } from "../App";
import { useContext } from "react";

function NavBar () {

  const {userLogged, setUserLogged} = useContext(UsersContext)
  console.log(userLogged)

  const handleLogout = () => {
    setUserLogged('');
  };
  return (
  <div id='navBar'>
    <div id='logo'>
      <img src="https://cdn-icons-png.flaticon.com/128/2642/2642160.png" alt="Pitch icon" className='logo'/><p>GOAL Diggers</p>
    </div>
    <div id='navLinks'>
      <NavLink to='/'>
        <p>Home</p>
      </NavLink>
      <NavLink to='/available-games'>
        <p>Games</p>
      </NavLink>
      <NavLink to='/host-game'>
        <p>Host</p>
      </NavLink>
    </div>
    <div className='navBarButtons'>
     {userLogged ? (
        
          <div className='userName'>
            <p>{userLogged}</p>
            <button id="logout" onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </button>
          </div>
        ):(
          <>
            <NavLink to="/users/register">
              <button id="register" style={{ cursor: "pointer" }}>
                Register
              </button>
            </NavLink>
            <NavLink to="/users/login">
              <button id="signIn" style={{ cursor: "pointer" }}>
                Sign In
              </button>
            </NavLink>
          </>
        )}
    </div>
  </div>
    
  )
}

export default NavBar