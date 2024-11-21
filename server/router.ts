import express from 'express';
import { getVenues } from './controllers/venues';
import { createGame, getGames, getGame, joinGame } from './controllers/games';
import { createNewUser, getUsers, getUser, login } from './controllers/user';

const router = express.Router();

// Routes
router.get('/venues', getVenues);
router.post('/games', createGame);
router.get('/games', getGames);
router.get('/games/:gameId', getGame);
router.put('/games/:gameId', joinGame);
router.post('/users', createNewUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/login', login); 

export default router;