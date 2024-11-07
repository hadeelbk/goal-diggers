const Venue = require ('./models/registeredVenues.js');
const Game = require ('./models/games.js')

async function getRegisteredVenues (req, res) {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues)
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({message:`Internal server issue: ${error}`})
  }
}

async function createGame (req, res) {
  try {
    const venue = req.body.venue
    const game = req.body
    const venueDetails = await Venue.findOne({name: venue})
    const createdGame = await Game.create({venue: venueDetails._id, date: game.date, players: game.players, game_type: game.game_type, price_per_head: game.price_per_head, contact_details: game.contact_details});
    res.status(201).json(createdGame)
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({message:`Internal server issue: ${error}`})
  }
}

async function getGames (req, res) {
  try {
    const games = await Game.find().populate('venue')
    res.status(200).json(games)
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({message:`Internal server issue: ${error}`})
  }
}

module.exports = {getRegisteredVenues, createGame, getGames}