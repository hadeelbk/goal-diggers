import { NavLink } from "react-router-dom";

const ActionContainer = () => (
  <div id="actionContainer">
    <div id="joinGame">
      <NavLink to="/available-games">
        <img
          className="logo"
          src="https://cdn-icons-png.flaticon.com/512/867/867329.png"
          alt="Pitch icon"
        />
        <p>Jump In and Play Today!</p>
      </NavLink>
    </div>
    <div id="hostGame">
      <NavLink to="/host-game">
        <img
          className="logo"
          src="https://cdn-icons-png.flaticon.com/512/1286/1286241.png"
          alt="Pitch icon"
        />
        <p>Create Your Own Game, Lead the Match!</p>
      </NavLink>
    </div>
  </div>
)

export default ActionContainer