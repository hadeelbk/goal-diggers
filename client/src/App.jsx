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
import { getUser, getVenues, getGames } from './services/apiService';

export const VenuesContext = React.createContext()
export const UserContext = React.createContext()
export const GamesContext = React.createContext()

function App() {
  const [venues, setVenues] = useState([])
  const [user, setUser] = useState([])
  const [games, setGames] = useState([])

  useEffect(() => {
    getUser().then(data => setUser(data))
  }, [])

  useEffect(() => {
    getVenues().then(data => setVenues(data))
  }, [])

  useEffect(() => {
    getGames().then(data => setGames(data))
  }, [])

  return (
    <div className='app'>
      <ScrollToTop />
      <VenuesContext.Provider value={venues}>
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
    </div>
  )
}

export default App
