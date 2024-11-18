import {
  createGame,
  getGames,
  getGame,
  joinGame,
} from "../../controllers/games";
import Game from "../../models/game";
import Venue from "../../models/venue";
import User from "../../models/user";

// Mock the models to isolate controller logic during tests
jest.mock("../models/game");
jest.mock("../models/venue");
jest.mock("../models/user");

// tests for gameController
describe("Game Controller", () => {
  // Clear all mocked calls after each test to ensure test isolation
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for the createGame function
  describe("createGame", () => {
    // Test: It creates a new game successfully
    it("should create a game successfully", async () => {
      const req = {
        body: {
          venue: "Test Venue",
          date: "2025-01-01",
          players_needed: 10,
          game_type: "Soccer",
          duration: 90,
          price_per_head: 2,
          contact_details: "contact@example.com",
        },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      // Mock the behavior of `Venue.findOne` and `Game.create`
      //Isolate the Controller Logic & Control Test Inputs and Outputs
      (Venue.findOne as jest.Mock).mockResolvedValue({ _id: "venueId" });
      (Game.create as jest.Mock).mockResolvedValue({ _id: "gameId" });

      await createGame(req, res);

      // Assert that the venue was looked up and the game was created
      expect(Venue.findOne).toHaveBeenCalledWith({ name: "Test Venue" });
      expect(Game.create).toHaveBeenCalledWith({
        venue: { _id: "venueId" },
        date: "2025-01-01",
        number_of_players_needed: 10,
        game_type: "Soccer",
        duration: 90,
        price_per_head: 2,
        contact_details: "contact@example.com",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ _id: "gameId" });
    });

    // Test: returns an error when submitted info is missing
    it("should return an error when submitted info is missing", async () => {
      const req = { body: {} } as any; // empty body = missing fields
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await createGame(req, res);

      // Assert that a 500 error is returned
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid input" });
    });
  });

  // Test the getGames function
  describe("getGames", () => {
    // Test: returns all games currently in the database
    it("should fetch all games", async () => {
      const req = {} as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      // Mock the behavior of `Game.find`
      (Game.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue([{ _id: "gameId" }]),
      });

      await getGames(req, res);

      // Assert that all games are fetched
      expect(Game.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ _id: "gameId" }]);
    });
  });





  // Test for the getGame function
  describe("getGame", () => {
    // Test:returns the new game from the /game/:id endpoint
    it("should fetch a game by ID", async () => {
      const req = { params: { gameId: "gameId" } } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      // Mock the behavior of `Game.findById`
      (Game.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue({ _id: "gameId" }),
      });

      await getGame(req, res);

      // Assert that the game is fetched by its ID
      expect(Game.findById).toHaveBeenCalledWith("gameId");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ _id: "gameId" });
    });
  });



  // Test for the joinGame function
  describe("joinGame", () => {
    // Test: adds an existing user to an existing game
    it("should let a user join a game", async () => {
      const req = {
        params: { gameId: "gameId" },
        body: { userName: "TestUser" },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      // Mock the behavior of `User.findOne` and `Game.findByIdAndUpdate`
      (User.findOne as jest.Mock).mockResolvedValue({ _id: "userId" });
      (Game.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        _id: "gameId",
      });

      await joinGame(req, res);

      // Assert that the user is added to the game
      expect(User.findOne).toHaveBeenCalledWith({ userName: "TestUser" });
      expect(Game.findByIdAndUpdate).toHaveBeenCalledWith(
        "gameId",
        { $addToSet: { players: { _id: "userId" } } },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });


    // Test:returns an error if the user doesn't exist
    it("should return an error if the user does not exist", async () => {
      const req = {
        params: { gameId: "gameId" },
        body: { userName: "NonexistentUser" },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.findOne as jest.Mock).mockResolvedValue(null); // User not found

      await joinGame(req, res);

      // Assert that a 404 error is returned
      expect(User.findOne).toHaveBeenCalledWith({
        userName: "NonexistentUser",
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    // Test: It returns an error if the game doesn't exist
    it("should return an error if the game does not exist", async () => {
      const req = {
        params: { gameId: "invalidGameId" },
        body: { userName: "TestUser" },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.findOne as jest.Mock).mockResolvedValue({ _id: "userId" });
      (Game.findByIdAndUpdate as jest.Mock).mockResolvedValue(null); // Game not found

      await joinGame(req, res);

      // Assert that a 404 error is returned
      expect(Game.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Game not found" });
    });

    // Test: It doesn't add a player twice to one game
    it("should not add the same player twice to one game", async () => {
      const req = {
        params: { gameId: "gameId" },
        body: { userName: "TestUser" },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.findOne as jest.Mock).mockResolvedValue({ _id: "userId" });
      (Game.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        _id: "gameId",
        players: [{ _id: "userId" }], // Player already in the game
      });

      await joinGame(req, res);

      // Assert that a 400 error is returned
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Player already in the game",
      });
    });
  });
});
