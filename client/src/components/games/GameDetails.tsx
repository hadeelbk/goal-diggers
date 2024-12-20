import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GamesContext } from "../../App"
import { getGame, joinGame } from "../../services/apiService"
import { dateDisplay, timeDisplay } from "../../utilities/date-time-display"
import { Game } from '../../@types/game'
import NavBar from '../common/NavBar'

function GameDetails() {
  const { games, setGames } = useContext(GamesContext)
  const { gameId } = useParams();

  const [game, setGame] = useState<Game | null>(null)
  const [userName, setUserName] = useState('')
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return;

      try {
        const fetchedGame = await getGame(gameId);
        setGame(fetchedGame);
      } catch (error) {
        console.error("Failed to fetch game details:", error);
        setError("Unable to load game details. Please try again later.");
        setGame(null); // Assuming you want to reset the game details or handle this case differently
      }
    };

    fetchGame();
  }, [gameId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!gameId) return;

      const updatedGame = await joinGame(gameId, { userName }) as Game;
      setGame(updatedGame);
      setGames(games.map(game => game._id === gameId ? updatedGame : game));
      setUserName('');
      setGame(updatedGame);
      setGames(games.map(game => game._id === gameId ? updatedGame : game));
      setUserName('');
    } catch (error) {
      console.error("Error joining game:", error);
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!game) return <div>Loading...</div>

  return (
    <div className='gameDetailsContainer'>
      <NavBar />
      <div className="gameTitle">
        <p>Game <strong>{game.game_type}</strong> at <strong>{game.venue.name}</strong></p>
      </div>
      <div className='gameInfo'>
        <div className='gameInfoContainer'>

          <div className='gameInfoTitle'>
            <p>When and Where:</p>
          </div>

          <div className='gameInfoElement'>
            <div className='gameInfoElement'>
              <img src="https://cdn-icons-png.flaticon.com/128/13138/13138477.png" alt="date icon" className="icon" />
              <p>{dateDisplay(game.date)}</p>
            </div>
          </div>
          <div className='gameInfoElement'>
            <img src="https://cdn-icons-png.flaticon.com/128/18005/18005280.png" alt="time icon" className="icon" />
            <p>{timeDisplay(game.date)}</p>
          </div>
          <div className='gameInfoElement'>
            <img src="https://cdn-icons-png.flaticon.com/128/17948/17948247.png" alt="location icon" className="icon" />
            <p>{game.venue.name}, {game.venue.address}</p>
          </div>
          <div className='gameInfoElement'>
            <img src="https://cdn-icons-png.flaticon.com/128/13252/13252511.png" alt="price icon" className="icon" />
            <p>{game.price_per_head}€/per person</p>
          </div>
        </div>

        <div className='teamsContainer'>
          <div className='teamInfo'>
            <img src="https://cdn-icons-png.flaticon.com/128/2257/2257031.png" alt="location icon" className="icon" />
            <p>Do you want to play football?</p>

            {/* !TODO: should be gated by user login */}
            <form onSubmit={handleSubmit}>
              <input type='text' placeholder="Add your Username " value={userName} onChange={handleChange} />
              <button type='submit'>Join</button>
            </form>
            {/*  */}
          </div>

          <div className="playersList">
            {Array.from({ length: game.number_of_players_needed }).map((_, index) => {
              const player = game.players[index];
              return (
                <div key={index} className="playerList">
                  {player ? (
                    <div className='playerSpot'>
                      <div className='playerInfo'>
                        <p><strong>{player.userName}</strong> <br /> Position: {player.position}</p>
                      </div>
                      <div className='playerIcon'>
                        <img src={player.position === "Goalkeeper"
                          ? "https://cdn-icons-png.flaticon.com/128/9192/9192882.png" // URL for goalkeeper icon
                          : "https://cdn-icons-png.flaticon.com/128/867/867329.png" // URL for other player icon
                        }
                          alt="player icon"
                          className="icon" />
                      </div>
                    </div>
                  ) : (
                    <div className="freeSpot">
                      <div className='playerInfo'>
                        <p><strong>Free Spot</strong></p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetails