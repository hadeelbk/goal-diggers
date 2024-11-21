import { useContext } from "react";
import { VenuesContext } from '../../App'
import { NavLink } from "react-router-dom";
import { imageMap } from './image-map';

function RegisteredVenueList() {
  const { venues } = useContext(VenuesContext);

  return (
    <div id='venueList'>
      <p id='venueTitle'>Where the action takes place</p>
      <p id='venueSubTitle'>
        Our registered venues
        <img
          src="https://cdn-icons-png.flaticon.com/128/4977/4977801.png"
          alt="Pitch icon"
          className="logo"
          height='50px'
        />
      </p>
      <div id='registeredVenues'>
        {venues && venues.map((venue) => (
          <div className='venue' key={venue.name}>
            <NavLink to={`venues/${venue._id}`}>
              <img
                src={imageMap[venue.image]}
                alt={venue.name}
                height='250'
              />
              <p id='venueName'>{venue.name}</p>
              <p id='venueAddress'>{venue.address}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RegisteredVenueList
