import mongoose, { Schema, Document, Model } from 'mongoose';
import { Game as IGameBase } from '../@types/model/game';

export interface IGame extends IGameBase, Document {}

const GameSchema: Schema<IGame> = new Schema({
  venue: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
  date: { type: Date, required: true },
  number_of_players_needed: { type: Number, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  game_type: { type: String, required: true },
  duration: { type: Number, required: true },
  price_per_head: { type: Number, default: 0 },
  contact_details: { type: String, required: true },
});


const Game: Model<IGame> = mongoose.model<IGame>('Game', GameSchema);

export default Game;