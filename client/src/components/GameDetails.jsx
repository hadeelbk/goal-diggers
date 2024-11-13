import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GamesContext } from "../App"
import { format} from 'date-fns';
import NavBar from "./NavBar";

function GameDetails () {

 const basedUrl = 'http://localhost:3000/'
 const {games, setGames} = useContext(GamesContext)
 const {gameId} = useParams()


 const [game, setGame] = useState(null)
 const [venue, setVenue] = useState('')
 const [userName, setUserName] = useState('')
 const [gameError, setGameError] = useState(null);


 useEffect (() => {
  const game = games.find(game => game._id === gameId)
  setGame(game)
  setVenue(game?.venue)
 }, [games])

//  useEffect(() => {

//   const gameFromContext = games.find(game => game._id === gameId);
  
//   if (gameFromContext) {
//     setGame(gameFromContext);
//   } else {
//     (async function fetchData() {
//       try {
//         const response = await fetch(basedUrl + 'games/' + gameId);
//         const data = await response.json();
//         setGame(data);
//       } catch (error) {
//         setGameError(error.message);
//         console.error(gameError);
//       }
//     })();
//   }
// },[gameId, games]);




const handleChange = (event) => {
  setUserName(event.target.value)
}

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch(basedUrl + 'games/' + gameId, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({userName}),   
    })
    console.log(response.ok)
    if (response.ok) {
      const updatedGame = await response.json();
      // setGame(updatedGame);
      // setGames((prevGames) => [...prevGames, updatedGame]);
      setGames(prevGames => prevGames.map(g => 
        g._id === gameId ? updatedGame : g
      ));
      setUserName(''); 
    } else {
      const errorData = await response.json();
      console.error('Error joining game:', errorData);
    }
  } catch (error) {
    console.log(error)
  }
}

 function gameDateDisplay (gameDate) {
  return format(new Date(gameDate), "EEEE, MMMM d, uuuu")
 }

 function gameTimeDisplay (gameTime) {
  return format(new Date(gameTime), 'hh:mm aa' )
}



if (game) {
  return (
    <div className='gameDetailsContainer'>
      <NavBar/>
      <div className="gameTitle">
        <p>Game <strong>{game.game_type}</strong> at <strong>{venue.name}</strong></p>
      </div>
      <div className='gameInfo'>
        <div className='gameInfoContainer'>
  
          <div className='gameInfoTitle'>
            <p>When and Where:</p>
          </div>

          <div className='gameInfoElement'>
            <div className='gameInfoElement'>
              <img src="https://cdn-icons-png.flaticon.com/128/13138/13138477.png" alt="date icon" className="icon" />
              <p>{gameDateDisplay(game.date)}</p>
            </div>
          </div>
          <div className='gameInfoElement'> 
              <img src="https://cdn-icons-png.flaticon.com/128/18005/18005280.png" alt="time icon" className="icon" />
              <p>{gameTimeDisplay(game.date)}</p>
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
            <form onSubmit={handleSubmit}>
              <input type='text' placeholder="Add your Username " value={userName} onChange={handleChange}/>
              <button type='submit'>Join</button>
            </form>  
          </div>
          <div className="playersList">
            {Array.from({ length: game.number_of_players_needed }).map((_, index) => {
              const player = game.players[index];
              return (
                <div key={index} className="playerList">
                  {player ? (
                    <div className='playerSpot'>
                      <div className='playerInfo'>
                        <p><strong>{player.userName}</strong> <br/> Position: {player.position}</p>
                      </div>
                      <div className='playerIcon'>
                        <img src={player.position === "Goalkeeper" 
                          ? "https://cdn-icons-png.flaticon.com/128/9192/9192882.png" // URL for goalkeeper icon
                          : "https://cdn-icons-png.flaticon.com/128/867/867329.png" // URL for other player icon
                        }
                        alt="player icon"
                        className="icon"/>
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
}

export default GameDetails