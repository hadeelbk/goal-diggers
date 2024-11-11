import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GamesContext } from "../App"
import { format} from 'date-fns';

function GameDetails () {

const basedUrl = 'http://localhost:3000/'
 const {games} = useContext(GamesContext)
 const params = useParams()
 const gameId = params.gameId

 const [game, setGame] = useState(null)
 const [gameError, setGameError] = useState(null);


 useEffect(() => {

  const gameFromContext = games.find(game => game._id === gameId);
  
  if (gameFromContext) {
    setGame(gameFromContext);
  } else {
    (async function fetchData() {
      try {
        const response = await fetch(basedUrl + 'games/' + gameId);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        setGameError(error.message);
        console.error(gameError);
      }
    })();
  }
},[games]);


 function gameDateDisplay (gameDate) {
  return format(new Date(gameDate), "EEEE, MMMM d, uuuu")
 }

 function gameTimeDisplay (gameTime) {
  return format(new Date(gameTime), 'hh:mm aa' )
}

console.log(game)

if (game) {
  return (
    <div className='gameDetailsContainer'>
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
             
              <img src="https://cdn-icons-png.flaticon.com/128/9099/9099413.png" alt="price icon" className="icon" />
            
            
              <p>{game.price_per_head}€/per person</p>
            
          </div>
        </div>

        <div className='teamsContainer'>
          <div className='teamInfo'>
            <p>Do you want to play football</p>
          </div>
          <div className="playersList">
            {Array.from({ length: game.number_of_players_needed }).map((_, index) => {
              const player = game.players[index];
              return (
                <div key={index} className="playerSpot">
                  {player ? (
                    <div className="playerInfo">
                      <p>{player.userName}</p>
                      <p>Position: {player.position}</p>
                      <p>Name: {player.firstName} {player.lastName}</p>
                    </div>
                  ) : (
                    <div className="freeSpot">
                      <p>Free Spot</p>
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