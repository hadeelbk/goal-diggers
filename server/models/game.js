const mongoose = require('../db.js');
const {Schema} = mongoose;

const GameSchema = new Schema ({
  venue: {type: Schema.Types.ObjectId, ref: 'Venue'},
  date: {type: String, required: true},
  number_of_players_needed: {type: Number, required: true},
  players: [{type: Schema.Types.ObjectId, ref: 'User'}],
  game_type: {type: String, required: true},
  duration: {type: Number, required: true},
  price_per_head: {type: Number, default: 0},
  contact_details: {type: String, required: true}
})

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;