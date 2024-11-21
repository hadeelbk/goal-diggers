import { Request, Response } from 'express';
import Game from '../models/game';
import Venue from '../models/venue';
import User from '../models/user';

interface CreateGameRequest extends Request {
  body: {
    venue: string;
    date: string;
    players_needed: number;
    game_type: string;
    duration: number;
    price_per_head: number;
    contact_details: string;
  };
};


interface JoinGameRequest extends Request {
  params: {
    gameId: string;
  };
  body: {
    userName: string;
  };
}

async function createGame(req:CreateGameRequest, res:Response):Promise<void> {
  try {
    const data = req.body
    const venue = await Venue.findOne({ name: data.venue })
    const game = await Game.create({
      venue,
      date: data.date,
      number_of_players_needed: data.players_needed,
      game_type: data.game_type,
      duration: data.duration,
      price_per_head: data.price_per_head,
      contact_details: data.contact_details
    });

    res.status(201).json(game)
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` })
  }
}

async function getGames(req: Request, res: Response): Promise<void> {
  try {
    const games = await Game.find().populate('venue').populate('players');
    res.status(200).json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` });
  }
}



async function getGame(req: Request, res: Response): Promise<void> {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId).populate('venue').populate('players');
    if (!game) {
      res.status(404).json({ message: "Game not found" });
      return;
    }
    res.status(200).json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` });
  }
}

async function joinGame(req: JoinGameRequest, res: Response): Promise<void> {
  const { gameId } = req.params;
  const { userName } = req.body;

  try {
    const playerDetail = await User.findOne({ userName });
    if (!playerDetail) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      { $addToSet: { players: playerDetail } },
      { new: true }
    ).populate('players').populate('venue');

    if (!updatedGame) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Error joining game:", error);
    res.status(500).json({ message: `Internal server issue: ${error}` });
  }
}

export { createGame, getGames, getGame, joinGame }
