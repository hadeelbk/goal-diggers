const express = require ('express')
const router = express.Router();
const {getRegisteredVenues} = require('./controller')

router.get('/venues', getRegisteredVenues);

module.exports = router