import React from "react";
import { useContext } from "react";
import {VenuesContext} from '../App'

function RegisteredVenueList () {

  const venues = useContext(VenuesContext)
  return (
    <div id='venueList'>
      <p id='venueTitle'>Where the action takes place</p>
      <p id='venueSubTitle'>Our registered venues</p>
      <div id='registeredVenues'>
        {venues.map((venue,index) => (
        <div className='venue' key={venue._id}>
          <img src={venue.image} height='250'/>
          <p id='venueName'>{venue.name}</p>
          <p id='venueAddress'>{venue.address}</p>
        </div>
    ))
    }
    </div>
  </div>
  )
}

export default RegisteredVenueList
