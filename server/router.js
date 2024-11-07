const express = require ('express')
const router = express.Router();
const {getRegisteredVenues, createGame, getGames} = require('./controller')

router.get('/venues', getRegisteredVenues);
router.post('/games', createGame)
router.get('/games', getGames)

module.exports = router