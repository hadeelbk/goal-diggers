import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GamesContext, VenuesContext } from '../../App';
import { CreateGame, createGame } from '../../services/apiService';
import NavBar from '../common/NavBar.test';
import { Venue } from '../../@types/venue';
import { Game } from '../../@types/game';

function HostGameForm() {
  const navigate = useNavigate();
  const { venues } = useContext(VenuesContext);
  const { games, setGames } = useContext(GamesContext);

  type NewGame = {
    venue: string,
    date: string,
    players_needed: string | number,
    game_type: string,
    duration: string | number,
    price_per_head: string | number,
    contact_details: string
  }

  const initialGame:NewGame = {
    venue: '',
    date: '',
    players_needed: '',
    game_type: '',
    duration: '',
    price_per_head: '',
    contact_details: ''
  };

  const [newGame, setNewGame] = useState(initialGame);

  const isFormComplete = Object.entries(newGame).every(([key, value]) => {
    if (['number_of_players_needed', 'duration', 'price_per_head'].includes(key)) {
      return Number(value) > 0;
    }
    return typeof value === 'string' && value.trim() !== '';
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewGame({ ...newGame, [name]: value });
  };

  const clearForm = () => setNewGame(initialGame);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormComplete) {
      try {
        newGame.players_needed = Number(newGame.players_needed)
        newGame.duration = Number(newGame.duration)
        newGame.price_per_head = Number(newGame.price_per_head)
        const createdGame: Game = await createGame(newGame as CreateGame);
        setGames([...games, createdGame]);
        clearForm();
        navigate(`/game-details/${createdGame._id}`);
      } catch (error) {
        console.error("Error creating game:", error);
      }
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
              {venues.map((venue: Venue) => (
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
            <label htmlFor='players_needed'>PLAYERS:</label>
            <br />
            <input
              type='number'
              name='players_needed'
              id='players_needed'
              value={newGame.players_needed}
              onChange={handleChange}
              min="1"
              placeholder='Number of players required...'
            />
          </div>

          <div className='formElement'>
            <label htmlFor='game_type'>GAME TYPE:</label>
            <br />
            <select
              name='game_type'
              id='game_type'
              value={newGame.game_type}
              onChange={handleChange}
            >
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
              min='0.5'
              max='2'
              step='0.5'
              value={newGame.duration}
              onChange={handleChange}
              placeholder='Duration in hours...'
            />
          </div>

          <div className='formElement'>
            <label htmlFor='price_per_head'>PRICE per PLAYER (€):</label>
            <br />
            <input
              type='number'
              name='price_per_head'
              id='price_per_head'
              min='0'
              step='0.5'
              value={newGame.price_per_head}
              onChange={handleChange}
              placeholder='Price per player...'
            />
          </div>

          <div className='formElement'>
            <label htmlFor='contact_details'>PHONE NUMBER:</label>
            <br />
            <input
              type='text'
              name='contact_details'
              id='contact_details'
              value={newGame.contact_details}
              onChange={handleChange}
              placeholder='Contact details...'
            />
          </div>

          <div className='submit'>
            <button type='submit' disabled={!isFormComplete}>Host Game</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default HostGameForm;
