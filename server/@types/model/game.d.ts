
export interface Game {
  venue: Schema.Types.ObjectId;
  date: Date;
  number_of_players_needed: number;
  players: Schema.Types.ObjectId[];
  game_type: string;
  duration: number;
  price_per_head: number;
  contact_details: string;
  }
  