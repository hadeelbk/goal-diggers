import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GamesContext, VenuesContext } from '../../App';
import { createGame } from '../../services/apiService';
import NavBar from '../common/NavBar';

function HostGameForm() {
  const navigate = useNavigate()
  const venues = useContext(VenuesContext)
  const { games, setGames } = useContext(GamesContext)
  const [newGame, setNewGame] = useState({
    venue: '',
    date: '',
    players_needed: '',
    game_type: '',
    duration: '',
    price_per_head: '',
    contact_details: ''
  });

  const isFormComplete = Object.values(newGame).every(value => value !== '');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGame({
      ...newGame,
      [name]: value
    })
  }

  const clearForm = () => {
    setNewGame({
      venue: '',
      date: '',
      players_needed: '',
      game_type: '',
      duration: '',
      price_per_head: '',
      contact_details: ''
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdGame = await createGame(newGame); // No need for .json() if it's already JSON
      setGames([...games, createdGame]);
      clearForm();
      navigate(`/game-details/${createdGame._id}`);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };  

  return (
    <>
      <NavBar />
      <div className='hostGameFormContainer'>
        <form className='hostGameForm' onSubmit={handleSubmit}>
          <div className='formElement'>
            <label htmlFor='venue'>VENUE</label>
            <br />
            <select
              name='venue'
              id='venue'
              value={newGame.venue}
              onChange={handleChange}
            >
              <option value=''>Select a venue</option>
              {venues.map(venue => (
                <option key={venue._id} value={venue.name}>{venue.name}</option>
              ))}
            </select>
          </div>

          <div className='formElement'>
            <label htmlFor='date'>DATE:</label>
            <br />
            <input
              type='datetime-local'
              name='date'
              id='date'
              value={newGame.date}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div className='formElement'>
            <label htmlFor='players'>PLAYERS:</label>
            <br />
            <input
              type='text'
              name='players_needed'
              id='players'
              value={newGame.players_needed}
              onChange={handleChange}
              placeholder='Number of players...'
            />
          </div>

          <div className='formElement'>
            <label htmlFor='gametype'>GAME TYPE:</label>
            <br />
            <select name='game_type' id='gameType' value={newGame.game_type} onChange={handleChange}>
              <option value=''>Select a game type</option>
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
            <label htmlFor='duration'>DURATION (h):</label>
            <br />
            <input
              type='number'
              name='duration'
              id='duration'
              min='0'
              max='2'
              placeholder='0'
              step='0.5'
              value={newGame.duration}
              onChange={handleChange}
            />
          </div>

          <div className='formElement'>
            <label htmlFor='price_per_head'>PRICE per PLAYER (€):</label>
            <br />
            <input
              type='number'
              name='price_per_head'
              id='price'
              min='0'
              placeholder='0'
              step='0.5'
              value={newGame.price_per_head}
              onChange={handleChange}
            />
          </div>

          <div className='formElement'>
            <label htmlFor='contact_details'>PHONE NUMBER</label>
            <br />
            <input
              type='text'
              name='contact_details'
              id='contactDetails'
              value={newGame.contact_details}
              onChange={handleChange}
            />
          </div>

          <div className='submit'>
            <button type='submit' disabled={!isFormComplete}>Host</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default HostGameForm