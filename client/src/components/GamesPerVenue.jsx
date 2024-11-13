import { useContext, useState, useEffect } from "react";
import { GamesContext, VenuesContext } from "../App";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { format, differenceInCalendarDays } from 'date-fns';
import { NavLink} from "react-router-dom";

function GamesPerVenue () {

  const {games} = useContext(GamesContext)
  const venues = useContext(VenuesContext)
  const {venueId} = useParams()
  
  const [filteredGames, setFilteredGames] = useState('')
  const [venue, setVenue] =useState('')

  useEffect (() => {
    const filtered = games.filter(game => game.venue && game.venue._id === venueId).sort((a,b) => new Date(a.date) - new Date(b.date));
      setFilteredGames(filtered)
    
    const venue = venues.find(venue => venue._id === venueId)
    setVenue(venue)
  }, [games])

  function gameDateDisplay (gameDate) {
    const today = new Date ()
    const daysUntilGame = differenceInCalendarDays(new Date(gameDate), today)

    if (daysUntilGame === 0) {
      return 'Today'
    } else if (daysUntilGame === 1) {
      return 'Tomorrow'
    } else {
      return format(new Date(gameDate), "EEEE, MMM d")
    }
  } 

  function gameTimeDisplay (gameTime) {
    return format(new Date(gameTime), 'hh:mm aa' )
  }

  function durationDisplay (duration) {
    if (duration === 0.5) {
      return '00:30'
    } else if (duration === 1) {
      return '1:00'
    } else if (duration === 1.5) {
      return '1:30'
    } else {
      return '2:00'
    }
  }
 
  return (
    <>
      <NavBar/>
      <div className='gamesPerVenueContainer'>
        <div className='venueTitle'>
          <p><strong>Venue</strong>: {venue?.name} 
          <br/> <strong>Address</strong>: <i>{venue?.address}</i></p>
          <img src={venue?.image} height='400' width='650'/>
        </div>
        <div className='upcomingGames'>
        {filteredGames.length>0 && filteredGames.map(game => (
          <div className='availableGame' key={game._id}>
            <NavLink to={`/game-details/${game._id}`}>
            <div className='gameDate'>
              <p>{gameDateDisplay(game.date)}</p>
            </div>
            <div className='gameDetails'>
              <div className='kickoffIcon'>
                <img src="https://cdn-icons-png.flaticon.com/128/8831/8831902.png" alt="Kick-off icon" className="icon" />
              </div>
              <div className='gameTime'>
                <p><strong>Kick Off:</strong> {gameTimeDisplay(game.date)}</p>
                <br/>
                {/* <p>{gameTimeDisplay(game.date)}</p> */}
                <p><strong>Duration:</strong> {durationDisplay(game.duration)}h</p>
              </div>
              <div className='venueIcon'>
                <img src="https://cdn-icons-png.flaticon.com/128/17355/17355932.png" alt="Venue icon" className="icon" />
              </div>
              <div className='gameVenue'>
                <p>{game.venue.name}</p>
              </div>
              <div className='addressIcon'>
                <img src="https://cdn-icons-png.flaticon.com/128/17296/17296756.png" alt="Address icon" className="icon" />
              </div>
              <div className='venueAddress'>
                <p>{game.venue.address}</p>
              </div>
              <div className='priceIcon'>
                <img src="https://cdn-icons-png.flaticon.com/128/13252/13252513.png" alt="Price icon" className="icon" />
              </div>
              <div className='gamePrice'>
                <p>{game.price_per_head}€</p>
              </div>
              <div className='playerIcon'>
                <img src="https://cdn-icons-png.flaticon.com/128/14735/14735123.png" alt="Player icon" className="icon" />
              </div>
              <div className='extraDetails'>
                <div className='gameType'>
                  <p>{game.game_type}</p>
                </div>
                <div className='registeredPlayers'>
                  <p>{game.players.length}/{game.number_of_players_needed}</p> 
                </div>
              </div>
            </div>
            </NavLink>
          </div>
        ))}
        {filteredGames.length === 0 &&
        <div className='notAvailableGames'>
            <p>Don’t see any games?Take the lead and host one of your own!</p>
            <NavLink to="/host-game">
              <img src="https://cdn-icons-png.flaticon.com/512/1286/1286241.png" alt="Pitch icon" className="logo" />
            </NavLink>
        </div>
        }
        </div>
      </div>
    </>
  )
}

export default GamesPerVenue