import React from 'react';
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HostGameForm from './components/HostGameForm';
import AvailableGames from './components/AvailableGames';


export const VenuesContext = React.createContext()
export const GamesContext = React.createContext()
  
function App() {
  const [venues, setVenues] = useState([]);
  const [games, setGames] = useState([])
  const [venueError, setVenueError] = useState(null);
  const [gameError, setGameError] = useState(null);
  const [sorted, setSorted] = useState([]);

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
  },[])

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
    const sortedGames = games.filter( game => new Date(game.date) > new Date())
    .sort((a,b) => new Date(a.date) - new Date(b.date));
    setSorted(sortedGames)
  },[games])

  return (
    <div className='app'>
      <VenuesContext.Provider value={venues}>
        <GamesContext.Provider value={{games, sorted, setGames}}>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='host-game' element={<HostGameForm/>} />
            <Route path='available-games' element={<AvailableGames/>} />
          </Routes>
        </GamesContext.Provider>
      </VenuesContext.Provider>
    </div>
  )
}

export default App
