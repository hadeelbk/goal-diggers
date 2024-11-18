import { useState, useEffect } from "react";
import { useContext } from "react";
import { GamesContext, VenuesContext } from "../../App";
import NavBar from "../common/NavBar";
import { NavLink } from "react-router-dom";
import { durationDisplay, dateDisplay, timeDisplay } from '../../utilities/date-time-display';
import { Game } from '../../@types/game';

function AvailableGames() {
  const { games } = useContext(GamesContext)
  const { venues } = useContext(VenuesContext)

  const [sortedGames, setSortedGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [venueFilter, setVenueFilter] = useState('')
  const [gameTypeFilter, setGameTypeGFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    const now = new Date();
    const sortedGames = games
      .filter((game) => new Date(game.date) > now) // Filter future games
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date
    setSortedGames(sortedGames);
  }, [games]);

  useEffect(() => {
    let filtered: Game[] = sortedGames;

    if (venueFilter) {
      filtered = sortedGames.filter(game => game.venue.name === venueFilter);
    }

    if (gameTypeFilter) {
      filtered = sortedGames.filter(game => game.game_type === gameTypeFilter);
    }

    if (dateFilter) {
      const selectedDate = new Date(dateFilter);
      filtered = sortedGames.filter(game => new Date(game.date) > selectedDate);
    }

    setFilteredGames(filtered);
  }, [venueFilter, gameTypeFilter, dateFilter, sortedGames]);

  /* filter change handlers*/

  function handleVenueFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const venue = event.target.value
    setVenueFilter(venue)
  }

  function handleGameTypeFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const gameType = event.target.value
    setGameTypeGFilter(gameType)
  }

  function handleDateFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    const date = event.target.value
    setDateFilter(date)
  }


  return (
    <div className='availableGamesPage'>
      <NavBar />
      <div className='filterContainer'>
        <form className='filters'>

          <div className='filterVenue'>
            <label htmlFor='venue'>VENUE</label>
            <br />
            <select name='venue' id='filterVenue' value={venueFilter} onChange={handleVenueFilterChange}>
              <option value=''>Select a venue</option>
              {venues.map(venue => (
                <option key={venue.name} value={venue.name}>{venue.name}</option>
              ))}
            </select>
          </div>

          <div className='filterGameType'>
            <label htmlFor='gameType'>GAME TYPE</label>
            <br />
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
            <br />
            <input
              type='datetime-local'
              name='date'
              id='filterDate'
              value={dateFilter}
              onChange={handleDateFilterChange}
            />
          </div>

        </form>
      </div>
      <div className='availableGamesContainer'>

        {filteredGames.length > 0 && filteredGames.map(game => (
          <div className='availableGame' key={game.id}>
            <NavLink to={`/game-details/${game.id}`}>
              <div className='gameDate'>
                <p>{dateDisplay(game.date)}</p>
              </div>
              <div className='gameDetails'>
                <div className='kickoffIcon'>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/13604/13604235.png"
                    alt="Kick-off icon"
                    className="icon"
                  />
                </div>
                <div className='gameTime'>
                  <p><strong>Kick Off:</strong> {timeDisplay(game.date)}</p>
                  <br />
                  {/* <p>{gameTimeDisplay(game.date)}</p> */}
                  <p><strong>Duration:</strong> {durationDisplay(game.duration)}h</p>
                </div>
                <div className='venueIcon'>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/17355/17355932.png"
                    alt="Venue icon"
                    className="icon"
                  />
                </div>
                <div className='gameVenue'>
                  <p>{game.venue.name}</p>
                </div>
                <div className='addressIcon'>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/17296/17296756.png"
                    alt="Address icon"
                    className="icon"
                  />
                </div>
                <div className='venueAddress'>
                  <p>{game.venue.address}</p>
                </div>
                <div className='priceIcon'>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9099/9099413.png"
                    alt="Price icon"
                    className="icon"
                  />
                </div>
                <div className='gamePrice'>
                  <p>{game.price_per_head}€</p>
                </div>
                <div className='playerIcon'>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2112/2112139.png"
                    alt="Player icon"
                    className="icon"
                  />
                </div>
                <div className='extraDetails'>
                  <div className='gameType'>
                    <p>{game.game_type}</p>
                  </div>
                  <div className='registeredPlayers'>
                    <p>{game.players.length}/{game.number_of_players_needed}</p> {/*needs to be altered once you add the players array*/}
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
        {venueFilter === '' || (Array.isArray(filteredGames) && filteredGames.length === 0) &&
          <div className='notAvailableGames'>
            <p>Don’t see any games? Take the lead and host one of your own!</p>
            <NavLink to="/host-game">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1286/1286241.png"
                alt="Pitch icon"
                className="logo"
              />
            </NavLink>
          </div>
        }
      </div>
    </div>
  )
}

export default AvailableGames;