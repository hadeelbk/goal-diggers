import { useContext } from "react";
import { VenuesContext } from '../../App'
import { NavLink } from "react-router-dom";
import arena from '../../assets/arena.png';
import diego from '../../assets/diego.png';
import el_classico from '../../assets/el_classico.png';
import football_madness from '../../assets/football_madness.png';
import glyfada_goals from '../../assets/glyfada_goals.png';
import kifisia_kickoff from '../../assets/kifisia_kickoff.png';
import olympus_sports from '../../assets/olympus_sports.png';
import sport_mania from '../../assets/sport_mania.png';

const imageMap = {
  "arena": arena,
  "diego": diego,
  "el_classico": el_classico,
  "football_madness": football_madness,
  "glyfada_goals": glyfada_goals,
  "kifisia_kickoff": kifisia_kickoff,
  "olympus_sports": olympus_sports,
  "sport_mania": sport_mania,
};

function RegisteredVenueList() {
  const venues = useContext(VenuesContext)

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
        {venues.map((venue) => (
          <div className='venue' key={venue._id}>
            <NavLink to={`venues/${venue._id}`}>
              <img
                src={imageMap[venue.image] || "https://via.placeholder.com/250"}
                alt={venue.image}
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
