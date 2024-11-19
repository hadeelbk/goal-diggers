import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/common/ScrollToTop';
import HostGameForm from './components/forms/HostGameForm';
import RegisterForm from './components/forms/RegisterForm';
import AvailableGames from './components/games/AvailableGames';
import GameDetails from './components/games/GameDetails';
import GamesPerVenue from './components/games/GamesPerVenue';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { getVenues, getGames } from './services/apiService';
import { Game } from './@types/game';
import { User } from './@types/user';
import { Venue } from './@types/venue';

export const VenuesContext = React.createContext<{venues: Venue[]}>({ venues: [] })

export const GamesContext = React.createContext<{
  games: Game[],
  setGames: React.Dispatch<React.SetStateAction<Game[]>>
}>({ games: [], setGames: () => { } })

export const UserContext = React.createContext<{
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}>({ user: null, setUser: () => { } })

function App() {
  const [venues, setVenues] = useState([])
  const [games, setGames] = useState<Game[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getVenues().then(data => setVenues(data))
  }, [])

  useEffect(() => {
    getGames().then(data => setGames(data))
  }, [])

  return (
    <div className='app'>
      <ScrollToTop />
      <VenuesContext.Provider value={{ venues }}>
        <UserContext.Provider value={{ user, setUser }}>
          <GamesContext.Provider value={{ games, setGames }}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='users/register' element={<RegisterForm />} />
              <Route path='users/login' element={<LoginPage />} />
              <Route path='host-game' element={<HostGameForm />} />
              <Route path='available-games' element={<AvailableGames />} />
              <Route path='game-details/:gameId' element={<GameDetails />} />
              <Route path='venues/:venueId' element={<GamesPerVenue />} />
              <Route path='*' element={<h1>404 - Not Found</h1>} />
            </Routes>
          </GamesContext.Provider>
        </UserContext.Provider>
      </VenuesContext.Provider>
    </div >
  )
}

export default App
