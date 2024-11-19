import { Player } from './player';
import { Venue } from './venue';

export interface Game {
  _id: string; 
  venue: Venue;
  date: string;
  number_of_players_needed: number;
  players: Player[];
  game_type: string;
  duration: number;
  price_per_head: number;
  contact_details: string;
}