const Game = require('../models/game');
const Venue = require('../models/venue');
const User = require('../models/user');

async function createGame(req, res) {
  try {
    const data = req.body
    const venue = await Venue.findOne({ name: data.venue })
    const game = await Game.create({
      venue,
      date: data.date,
      number_of_players_needed: data.players_needed,
      game_type: data.game_type,
      duration: data.duration,
      price_per_head: data.price_per_head,
      contact_details: data.contact_details
    });
    res.status(201).json(game)
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` })
  }
}

async function updateGame(req, res) {
  try {
    const gameId = req.params.gameId
    const data = req.body
    const game = await Game.findByIdAndUpdate(gameId, data, { new: true })
    res.status(200).json(game)
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` })
  }
}

async function getGames(req, res) {
  try {
    const games = await Game.find().populate('venue').populate('players')
    res.status(200).json(games)
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` })
  }
}

async function getGame(req, res) {
  try {
    const gameId = req.params.gameId
    const game = await Game.findById(gameId).populate('venue').populate('players')
    res.status(200).json(game)
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` })
  }
}

async function joinGame(req, res) {
  const gameId = req.params.gameId;
  const playerUsername = req.body.userName;

  try {
    const playerDetail = await User.findOne({ userName: playerUsername });
    if (!playerDetail) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      { $addToSet: { players: playerDetail } },
      { new: true }
    ).populate('players').populate('venue');
    
    if (!updatedGame) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Error joining game:", error);
    res.status(500).json({ message: `Internal server issue: ${error}` });
  }
}

module.exports = { createGame, getGames, getGame, updateGame, joinGame }