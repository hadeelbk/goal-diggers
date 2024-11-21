import { createNewUser, login, getUsers, getUser } from '../../controllers/user';
import User from '../../models/user';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// Mock the User model and bcrypt functions
jest.mock('../../models/user');
jest.mock('bcrypt');

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


describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('createNewUser', () => {
    it('should create a new user successfully', async () => {
      const req = {
        body: {
          userName: 'TestUser',
          password: 'password123',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          dateOfBirth: '1990-01-01',
          position: 'Developer',
        },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (User.create as jest.Mock).mockResolvedValue({ _id: 'userId' });

      await createNewUser(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(User.create).toHaveBeenCalledWith({
        userName: 'TestUser',
        password: 'hashedPassword',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        dateOfBirth: '1990-01-01',
        position: 'Developer',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ _id: 'userId' });
    });

    it('should handle errors and return 500', async () => {
      const req = { body: {} } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hashing error'));

      await createNewUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: `Internal server issue: Error: Hashing error`,
      });
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      const req = {
        body: { usernameOrEmail: 'TestUser', password: 'password123' },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.findOne as jest.Mock).mockResolvedValue({
        _id: 'userId',
        userName: 'TestUser',
        email: 'test@example.com',
        password: 'hashedPassword',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        $or: [{ userName: 'TestUser' }, { email: 'TestUser' }],
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(res.json).toHaveBeenCalledWith({
        userId: 'userId',
        username: 'TestUser',
        email: 'test@example.com',
      });
    });

    it('should return 400 if user is not found', async () => {
      const req = {
        body: { usernameOrEmail: 'NonexistentUser', password: 'password123' },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.findOne as jest.Mock).mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid username or email' });
    });

    it('should return 400 if password is incorrect', async () => {
      const req = {
        body: { usernameOrEmail: 'TestUser', password: 'wrongPassword' },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.findOne as jest.Mock).mockResolvedValue({
        _id: 'userId',
        userName: 'TestUser',
        email: 'test@example.com',
        password: 'hashedPassword',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid password' });
    });

    it('should handle errors and return 500', async () => {
      const req = { body: {} } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: `Internal server issue: Error: Database error`,
      });
    });
  });

  describe('getUsers', () => {
    it('should fetch all users successfully', async () => {
      const req = {} as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.find as jest.Mock).mockResolvedValue([{ _id: 'userId', userName: 'TestUser' }]);

      await getUsers(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ _id: 'userId', userName: 'TestUser' }]);
    });

    it('should handle errors and return 500', async () => {
      const req = {} as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: `Internal server issue: Error: Database error`,
      });
    });
  });

  describe('getUser', () => {
    it('should fetch a user by ID successfully', async () => {
      const req = { params: { userId: 'userId' } } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.findById as jest.Mock).mockResolvedValue({ _id: 'userId', userName: 'TestUser' });

      await getUser(req, res);

      expect(User.findById).toHaveBeenCalledWith('userId');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ _id: 'userId', userName: 'TestUser' });
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { id: 'invalidId' } } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      (User.findById as jest.Mock).mockRejectedValue(new Error('Database error'));

      await getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: `Internal server issue: Error: Database error`,
      });
    });
  });
});