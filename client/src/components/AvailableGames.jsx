import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { GamesContext,VenuesContext } from "../App";
import { format, differenceInCalendarDays } from 'date-fns';
import NavBar from "./NavBar";

function AvailableGames () {

  const {sorted} = useContext(GamesContext)
  const venues = useContext(VenuesContext)

  const [filteredGames, setFilteredGames] = useState('')
  const [venueFilter, setVenueFilter] = useState('')
  const [gameTypeFilter, setGameTypeGFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')


  /* filter change handlers*/

  function handleVenueFilterChange (event) {
    const venue = event.target.value
    setVenueFilter(venue)
  }

  function handleGameTypeFilterChange (event) {
    const gameType = event.target.value
    setGameTypeGFilter(gameType)
  }

  function handleDateFilterChange (event) {
    const date = event.target.value
    setDateFilter(date)
  }

  useEffect(() => {
    let filtered = sorted;

    if (venueFilter) {
      filtered = filtered.filter(game => game.venue.name === venueFilter);
    }

    if (gameTypeFilter) {
      filtered = filtered.filter(game => game.game_type === gameTypeFilter);
    }

    if (dateFilter) {
      const selectedDate = new Date(dateFilter);
      filtered = filtered.filter(game => new Date(game.date) > selectedDate);
    }

    setFilteredGames(filtered);
  }, [venueFilter, gameTypeFilter, dateFilter, sorted]);

  /* date display functions */

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

  return (
    <div className='availableGamesPage'>
      <NavBar/>
      <div className='filters'>
        <form>

          <div className='filterVenue'>
            <label htmlFor='venue'>VENUE</label>
            <select name='venue' id='filterVenue' value={venueFilter} onChange={handleVenueFilterChange}>
              <option value=''>Select a venue</option>
              {venues.map(venue => (
                <option key={venue._id} value={venue.name}>{venue.name}</option>
              ))}
            </select>
          </div>

          <div className='filterGameType'>
            <label htmlFor='gameType'>GAME TYPE</label>
            <select name='gameType' id='filterGameType' value={gameTypeFilter} onChange={handleGameTypeFilterChange}>
              <option value="">Select a game type</option>
              <option value='5-a-side'>5-a-side</option>
              <option value='6-a-side'>6-a-side</option>
              <option value='7-a-side'>7-a-side</option>
              <option value='8-a-side'>8-a-side</option>
              <option value='9-a-side'>9-a-side</option>
              <option value='10-a-side'>10-a-side</option>
              <option value='11-a-side'>11-a-side</option>
            </select>
          </div>

          <div className='filterDate'>
            <label htmlFor='date'>DATE & TIME</label>
            <input type='datetime-local' name='date' id='filterDate' value={dateFilter} onChange={handleDateFilterChange}/>
          </div>

        </form>
      </div>
      <div className='availableGamesContainer'>

        {filteredGames.length>0 && filteredGames.map(game => (
          <div className='availableGame' key={game._id}>
            <div className='gameDate'>
              <p>{gameDateDisplay(game.date)}</p>
            </div>
            <div className='gameDetails'>
              <div className='kickoffIcon'>
                <img src="https://cdn-icons-png.flaticon.com/128/8831/8831902.png" alt="Kick-off icon" className="icon" />
              </div>
              <div className='gameTime'>
                <p><strong>Kick Off:</strong></p>
                <br/>
                <p>{gameTimeDisplay(game.date)}</p>
              </div>
              <div className='venueIcon'>
                <img src="https://cdn-icons-png.flaticon.com/128/17355/17355932.png" alt="Kick-off icon" className="icon" />
              </div>
              <div className='gameVenue'>
                <p>{game.venue.name}</p>
              </div>
              <div className='gameType'>
                <p>{game.game_type}</p>
              </div>
              <div className='extraDetails'>
                <div className='gamePrice'>
                  <p>£{game.price_per_head}</p>
                </div>
                <div className='registeredPlayers'>
                  <p>7/18</p> {/*needs to be altered once you add the players array*/}
                </div>
              </div>
            </div>
          </div>
        ))}

        {venueFilter === '' || (Array.isArray(filteredGames) && filteredGames.length === 0) &&
          <div className='notAvailableGames'>
          <h1>No available games with the current selection</h1>
        </div>
        }
    </div>
  </div>
  )
}

export default AvailableGames