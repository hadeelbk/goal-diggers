import NavBar from '../components/common/NavBar';
import RegisteredVenueList from '../components/venues/RegisteredVenueList';
import ActionContainer from '../components/common/ActionContainer';


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