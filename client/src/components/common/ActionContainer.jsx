import { NavLink } from "react-router-dom";

function ActionContainer () {
  return (
    <div id="actionContainer">
    <div id="joinGame">
      <NavLink to="/available-games">
        <img src="https://cdn-icons-png.flaticon.com/512/867/867329.png" alt="Pitch icon" className="logo" />
        <p>Jump In and Play Today!</p>
      </NavLink>
    </div>
    <div id="hostGame">
      <NavLink to="/host-game">
        <img src="https://cdn-icons-png.flaticon.com/512/1286/1286241.png" alt="Pitch icon" className="logo" />
        <p>Create Your Own Game, Lead the Match!</p>
      </NavLink>
    </div>
  </div>
  )
}

export default ActionContainer