import React from "react";
import { useContext } from "react";
import { GamesContext } from "../App";

function AvailableGames () {

  const {sorted} = useContext(GamesContext)
  return (
    <>
    {sorted.map(game => (
    <div className='venue' key={game._id}>
      <img src={game.venue.image} height='250'/>
      <p>{game.venue.name}</p>
      <p>{game.venue.address}</p>
    </div>
    ))}
    </>
  )
}

export default AvailableGames