import React from "react";


function RegisteredVenueList ({registeredList}) {
  return (
    <>
    <h1>Where the action takes place</h1>
    <h3>Our registered venues</h3>
    <div id='registeredVenues'>
      {registeredList.map((venue,index) => (
      <div className='venue' key={venue._id}>
        <img src={venue.image} height='250'/>
        <p>{venue.name}</p>
        <p>{venue.address}</p>
      </div>
    ))
    }
    </div>
    </>
  )
}

export default RegisteredVenueList
