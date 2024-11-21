import { createGame, getGames, getGame, joinGame } from '../../controllers/games';
import Game from '../../models/game';
import Venue from '../../models/venue';
import User from '../../models/user';
import mongoose from 'mongoose';

// Mock the models to isolate the controller logic
jest.mock('../../models/game');
jest.mock('../../models/venue');
jest.mock('../../models/user');

// Suppress console logs during tests for clean output 
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Close the database connection and restore mocks after tests
afterAll(async () => {
  await mongoose.connection.close(); // Close the connection
  jest.restoreAllMocks();// Restore original console methods
});


describe('Game Controller', () => {
  // Clear mock data between tests
  afterEach(() => {
    jest.clearAllMocks();
  });

   // Test cases for the createGame function
  describe('createGame', () => {
    it('should create a game successfully', async () => {
       // Mock request and response objects
      const req = {
        body: {
          venue: 'Test Venue',
          date: '2024-01-01',
          players_needed: 10,
          game_type: 'Soccer',
          duration: 90,
          price_per_head: 5,
          contact_details: 'contact@example.com',
        },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(), // Mock status method
        json: jest.fn(), // Mock json method
      } as any;

      // Mock Venue.findOne and Game.create to simulate database behavior
      (Venue.findOne as jest.Mock).mockResolvedValue({ _id: 'venueId' });
      (Game.create as jest.Mock).mockResolvedValue({ _id: 'gameId' });

       // Call the createGame function
      await createGame(req, res);

      // Verify the mocks were called with the correct arguments
      expect(Venue.findOne).toHaveBeenCalledWith({ name: 'Test Venue' });
      expect(Game.create).toHaveBeenCalledWith({
        venue: { _id: 'venueId' },
        date: '2024-01-01',
        number_of_players_needed: 10,
        game_type: 'Soccer',
        duration: 90,
        price_per_head: 5,
        contact_details: 'contact@example.com',
      });

        // Verify the response status and payload
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ _id: 'gameId' });
    });

    it('should return 500 if an error occurs', async () => {
      const req = { body: {} } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (Venue.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

      await createGame(req, res);

       // Verify the response status and error payload
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: `Internal server issue: Error: Database error`,
      });
    });
  });



   // Test cases for the getGames function
  describe('getGames', () => {
    it('should fetch all games', async () => {
      const req = {} as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;


       // Mock Game.find and chained populate calls
      (Game.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue([{ _id: 'gameId', players: [] }]),
        }),
      });

      await getGames(req, res);

         // Verify Game.find was called
      expect(Game.find).toHaveBeenCalled();
      // Verify the response status and payload
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ _id: 'gameId', players: [] }]);
    });

    it('should return 500 if fetching games fails', async () => {
      const req = {} as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;


  // Mock Game.find to simulate an error
      (Game.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockRejectedValue(new Error('Database error')),
        }),
      });

      await getGames(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: `Internal server issue: Error: Database error`,
      });
    });
  });


   // Test cases for the getGame function
  describe('getGame', () => {
    it('should fetch a game by ID', async () => {
      const req = { params: { gameId: 'gameId' } } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (Game.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue({ _id: 'gameId', players: [] }),
        }),
      });

      await getGame(req, res);

      // Verify Game.findById was called with the correct ID
      expect(Game.findById).toHaveBeenCalledWith('gameId');
        // Verify the response status and payload
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ _id: 'gameId', players: [] });
    });

    it('should return 404 if the game is not found', async () => {
      const req = { params: { gameId: 'invalidGameId' } } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

        // Mock Game.findById to return null
      (Game.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(null),
        }),
      });

      await getGame(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Game not found' });
    });
  });


   // Test cases for the joinGame function
  describe('joinGame', () => {
    it('should let a user join a game', async () => {
      const req = {
        params: { gameId: 'gameId' },
        body: { userName: 'TestUser' },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

        // Mock User.findOne and Game.findByIdAndUpdate
      (User.findOne as jest.Mock).mockResolvedValue({ _id: 'userId' });
      (Game.findByIdAndUpdate as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue({
            _id: 'gameId',
            players: [{ _id: 'userId' }],
          }),
        }),
      });

      await joinGame(req, res);

       // Verify the mocks and response
      expect(User.findOne).toHaveBeenCalledWith({ userName: 'TestUser' });
      expect(Game.findByIdAndUpdate).toHaveBeenCalledWith(
        'gameId',
        { $addToSet: { players: { _id: 'userId' } } },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        _id: 'gameId',
        players: [{ _id: 'userId' }],
      });
    });

    it('should return 404 if the user does not exist', async () => {
      const req = { params: { gameId: 'gameId' }, body: { userName: 'NonexistentUser' } } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.findOne as jest.Mock).mockResolvedValue(null);

      await joinGame(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return 404 if the game does not exist', async () => {
      const req = {
        params: { gameId: 'invalidGameId' },
        body: { userName: 'TestUser' },
      } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.findOne as jest.Mock).mockResolvedValue({ _id: 'userId' });
      (Game.findByIdAndUpdate as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      await joinGame(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Game not found' });
    });
  });
});