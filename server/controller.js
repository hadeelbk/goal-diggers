const Venue = require ('./models/registeredVenues.js');
const Game = require ('./models/games.js')
const Users = require ('./models/user.js')
const bcrypt = require('bcrypt')

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
    const createdGame = await Game.create({venue: venueDetails, date: game.date, number_of_players_needed: game.players, game_type: game.game_type, duration: game.duration, price_per_head: game.price_per_head, contact_details: game.contact_details});
    res.status(201).json(createdGame)
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({message:`Internal server issue: ${error}`})
  }
}

async function getGames (req, res) {
  try {
    const games = await Game.find().populate('venue').populate('players')
    res.status(200).json(games)
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({message:`Internal server issue: ${error}`})
  }
}

async function getGame (req, res) {
  try {
    const gameId = req.params.gameId
    const game = await Game.findById(gameId).populate('venue').populate('players')
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({message:`Internal server issue: ${error}`})
  }

}

async function createNewUser ( req, res) {
  try {
    const user = req.body
    const {password} = req.body
    const hash = await bcrypt.hash(password, 10)
    const newUser = await Users.create({userName: user.userName, password: hash, email: user.email, firstName: user.firstName, lastName: user.lastName, dateOfBirth: user.dateOfBirth, position: user.position})
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({message:`Internal server issue: ${error}`})
  }
}

async function login (req, res) {
  const { usernameOrEmail, password } = req.body;

  try {
    let user = await Users.findOne({ userName: usernameOrEmail }) || await Users.findOne({ email: usernameOrEmail });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    res.json({ userId: user._id, username: user.username, email: user.email })
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({message:`Internal server issue: ${error}`});
  }
}

async function getUserList (req, res) {
  try {
    const userList = await Users.find()
    res.status(200).json(userList)
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({message:`Internal server issue: ${error}`})
  }
}

async function joinGame(req, res) {
  const gameId = req.params.gameId;
  const playerUsername = req.body.userName;

  console.log(gameId)
  console.log(playerUsername)
  try {
    const playerDetail = await Users.findOne({ userName: playerUsername });
    if (!playerDetail) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      { $addToSet: { players: playerDetail._id } }, 
      { new: true } 
    ).populate('players'); 

    if (!updatedGame) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Error joining game:", error);
    res.status(500).json({ message: `Internal server issue: ${error}` });
  }
}
 module.exports = {getRegisteredVenues, createGame, getGames, getGame, createNewUser, getUserList, login, joinGame}