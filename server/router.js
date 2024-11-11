const express = require ('express')
const router = express.Router();
const {getRegisteredVenues, createGame, getGames, getGame, createNewUser, getUserList, login, joinGame} = require('./controller')

router.get('/venues', getRegisteredVenues);
router.post('/games', createGame);
router.get('/games', getGames);
router.get('/games/:gameId', getGame)
router.post('/users', createNewUser);
router.get('/users', getUserList);
router.post('/login', login);
router.put('/games/:gameId', joinGame)

module.exports = router