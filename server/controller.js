const Venue = require ('./models/registeredVenues.js');

async function getRegisteredVenues (req, res) {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues)
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({message:`Internal server issue: ${error}`})
  }
}

module.exports = {getRegisteredVenues}