const Venue = require('../models/venue.js');

async function getVenues(req, res) {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues)
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({message:`Internal server issue: ${error}`})
  }
}

module.exports = { getVenues }