import React from "react";
import { useContext } from "react";
import {VenuesContext} from '../App'

function RegisteredVenueList () {

  const venues = useContext(VenuesContext)
  return (
    <div id='venueList'>
      <h1>Where the action takes place</h1>
      <h3>Our registered venues</h3>
      <div id='registeredVenues'>
        {venues.map((venue,index) => (
        <div className='venue' key={venue._id}>
          <img src={venue.image} height='250'/>
          <p>{venue.name}</p>
          <p>{venue.address}</p>
        </div>
    ))
    }
    </div>
  </div>
  )
}

export default RegisteredVenueList
