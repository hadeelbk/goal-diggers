import React from 'react';
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HostGameForm from './components/forms/HostGameForm';
import AvailableGames from './components/games/AvailableGames';
import GameDetails from './components/games/GameDetails';
import RegisterForm from './components/forms/RegisterForm';
import LoginPage from './pages/LoginPage';
import GamesPerVenue from './components/games/GamesPerVenue';
import ScrollToTop from './components/common/ScrollToTop';

export const VenuesContext = React.createContext()
export const GamesContext = React.createContext()
export const UsersContext = React.createContext()
  
function App() {
  const [venues, setVenues] = useState([]);
  const [games, setGames] = useState([])
  const [users, setUsers] = useState([])
  const [venueError, setVenueError] = useState(null);
  const [gameError, setGameError] = useState(null);
  const [userError, setUserError] = useState(null)
  const [sorted, setSorted] = useState([]);
  const [userLogged, setUserLogged] = useState('')

  const basedUrl = 'http://localhost:3000/'

  useEffect(() => {
    (async function fetchData () {
      try {
        const response = await fetch(basedUrl+'venues')
        const data = await response.json()
        setVenues(data)
      } catch (error) {
        setVenueError(error.message)
        console.log(venueError)
      }
    })();
  },[games])

  useEffect(() => {
    (async function fetchData () {
      try {
        const response = await fetch(basedUrl+'games')
        const data = await response.json()
        setGames(data)
      } catch (error) {
        setGameError(error.message)
        console.log(gameError)
      }
    })();
  },[])

  useEffect(() => {
    (async function fetchData () {
      try {
        const response = await fetch(basedUrl+'users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        setUserError(error.message)
        console.log(userError)
      }
    })();
  },[])

  
  useEffect(() => {
    const sortedGames = games.filter( game => new Date(game.date) > new Date())
    .sort((a,b) => new Date(a.date) - new Date(b.date));
    setSorted(sortedGames)
  },[games])

  return (
    <div className='app'>
      <ScrollToTop />
      <VenuesContext.Provider value={venues}>
        <GamesContext.Provider value={{games, sorted, setGames}}>
          <UsersContext.Provider value={{users, setUsers, userLogged, setUserLogged}}>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='users/register'element={<RegisterForm/>} />
              <Route path='users/login' element={<LoginPage/>} />
              <Route path='host-game' element={<HostGameForm/>} />
              <Route path='available-games' element={<AvailableGames/>} />
              <Route path='game-details/:gameId' element={<GameDetails/>} />
              <Route path='venues/:venueId' element={<GamesPerVenue venues={venues}/>}/>
            </Routes>
          </UsersContext.Provider>
        </GamesContext.Provider>
      </VenuesContext.Provider>
    </div>
  )
}

export default App
