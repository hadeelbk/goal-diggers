import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../../App';

function NavBar() {
  const { user, setUser } = useContext(UserContext)
  const handleLogout = () => setUser(null);

  return (
    <div id='navBar'>
      <div id='logo'>
        <img
          className='logo'
          src="https://cdn-icons-png.flaticon.com/128/2642/2642160.png"
          alt="Pitch icon"
        />
        <p>GOAL Diggers</p>
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
        {user ? (
          <div className='userName'>
            <p>{user.userName}</p>
            <button id="logout" onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </button>
          </div>
        ) : (
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