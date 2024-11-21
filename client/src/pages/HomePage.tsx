import NavBar from '../components/common/NavBar';
import RegisteredVenueList from '../components/venues/RegisteredVenueList';
import ActionContainer from '../components/common/ActionContainer';

const HomePage = () => (
  <div className='homePage'>
    <NavBar />
    <ActionContainer />
    <RegisteredVenueList />
  </div>
)

export default HomePage;