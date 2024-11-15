const express = require('express');
const { getVenues } = require('./controllers/venues');
const { createGame, getGames, getGame, joinGame } = require('./controllers/games');
const { createNewUser, getUsers, getUser, login } = require('./controllers/user');

const router = express.Router();

router.get('/venues', getVenues);
router.post('/games', createGame);
router.get('/games', getGames);
router.get('/games/:gameId', getGame)
router.put('/games/:gameId', joinGame);
router.post('/users', createNewUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/login', login);

module.exports = router;