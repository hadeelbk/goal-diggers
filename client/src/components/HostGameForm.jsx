import { useContext, useState } from "react";
import {VenuesContext} from '../App'
import { GamesContext } from "../App";

function HostGameForm ({gameVenue, gameType, gameDate}) {
  const venues = useContext(VenuesContext)
  const {games, setGames} = useContext(GamesContext) // needs to be used in submithandle

  const basedUrl = 'http://localhost:3000/'

  const [game, setGame] = useState({
    venue: gameVenue || '',
    date: gameDate || '',
    players: '',
    game_type: gameType || '',
    duration: '',
    price_per_head:'',
    contact_details:''
  });

  const isFormComplete = Object.values(game).every(value => value !== "");

  const handleChange = (event) => {
    const {name, value} = event.target;
    setGame({...game,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newGame = {...game}
   
    try {
      const response = await fetch(basedUrl+'games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(newGame),   
      })

      if (response.ok) {
        const createdGame = await response.json();
        setGames([...games, createdGame]);
        setGame({
          venue: '',
          date: '',
          players: '',
          game_type: '',
          duration: '',
          price_per_head: '',
          contact_details:''
      })
      }

    } catch (error) {
      console.log(error)
    }
  }


    return (
      <div className='hostGameFormContainer'>
        <form className='hostGameForm' onSubmit={handleSubmit}>
          {/* <p>Host your own game!</p> */}
  
          <div className='formElement'>
            <label htmlFor="venue">VENUE</label>
            <br/>
            <select name='venue' id='venue' value={game.venue} onChange={handleChange}> 
              <option value="">Select a venue</option>
              {venues.map(venue => (
                <option key={venue._id} value={venue.name}>{venue.name}</option>
              ))}
            </select>
          </div>
  
          <div className='formElement'>
            <label htmlFor="date">DATE:</label>
            <br/>
            <input type='datetime-local' name='date' id='date' value={game.date} onChange={handleChange} min={new Date().toISOString().slice(0, 16)}/>
          </div>
  
          <div className='formElement'>
            <label htmlFor="players">PLAYERS:</label>
            <br/>
            <input type='text' name='players'  id='players' value={game.players} onChange={handleChange} placeholder="Number of players..."/>
          </div>
  
          <div className='formElement'>
            <label htmlFor="gametype">GAME TYPE:</label>
            <br/>
            <select name='game_type' id='gameType' value={game.game_type} onChange={handleChange}>
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

          <div className='formElement'>
            <label htmlFor="duration">DURATION (h):</label>
            <br/>
            <input type='number' name='duration' id='duration' min='0' max='2' placeholder="0" step='0.5' value={game.duration} onChange={handleChange}/>
          </div>
  
          <div className='formElement'>
            <label htmlFor="price_per_head">PRICE per PLAYER (€):</label>
            <br/>
            <input type='number' name='price_per_head' id='price' min='0' placeholder="0" step='0.5' value={game.price_per_head} onChange={handleChange}/>
          </div>
  
          <div className='formElement'>
            <label htmlFor="contact_details">PHONE NUMBER</label>
            <br/>
            <input type='text' name='contact_details' id='contactDetails' value={game.contact_details} onChange={handleChange}/>
          </div>
  
          <div className='submit'>
            <button type='submit' disabled={!isFormComplete}>Host</button>
          </div>
        </form>
      </div>
    )
}

export default HostGameForm