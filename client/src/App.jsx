import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import NavBar from './components/NavBar';
import RegisteredVenueList from './components/registeredVenueList';

function App() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

  const basedUrl = 'http://localhost:3000/'

  useEffect(() => {
    (async function fetchData () {
      try {
        const response = await fetch(basedUrl+'venues')
        const data = await response.json()
        setVenues(data)
      } catch (error) {
        setError(error.message)
      }
    })();
  },[])

  return (
    <div class='app'>
      <NavBar/>
      <RegisteredVenueList registeredList = {venues}/>
    </div>
  )
}

export default App
