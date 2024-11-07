const mongoose = require('../ds.js');
const {Schema} = mongoose;

const footballGames = new Schema ({
  venue: {type: Schema.Types.ObjectId, ref: 'Venue'},
  date: {type: String, required: true},
  players: {type: Number, required: true},
  game_type: {type: String, required: true},
  price_per_head: {type: Number, default: 0},
  contact_details: {type: String, required: true}
})

const Game = mongoose.model('Game', footballGames)

module.exports = Game;