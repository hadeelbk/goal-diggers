const express = require('express');
const { getVenues } = require('./controllers/venues');
const { createGame, getGames, getGame, joinGame } = require('./controllers/games');
const { createNewUser, getUsers, login } = require('./controllers/user');

const router = express.Router();

router.get('/venues', getVenues);
router.post('/games', createGame);
router.get('/games', getGames);
router.get('/games/:gameId', getGame)
router.post('/users', createNewUser);
router.get('/users', getUsers);
router.post('/login', login);
router.put('/games/:gameId', joinGame);

module.exports = router