import NavBar from './NavBar';
import RegisteredVenueList from './registeredVenueList';
import ActionContainer from './ActionContainer';


function Home () {

  return (
    <div className='homePage'>
        <NavBar/>
        <ActionContainer/>
        <RegisteredVenueList/>
    </div>
  )
}

export default Home