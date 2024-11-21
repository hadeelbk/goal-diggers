import { getVenues } from '../../controllers/venues';
import Venue from '../../models/venue';
import mongoose from 'mongoose';

// Mock the Venue model
jest.mock('../../models/venue');

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Close the database connection and restore mocks after tests
afterAll(async () => {
  await mongoose.connection.close(); // Close the connection
  jest.restoreAllMocks();// Restore original console methods
});

describe('Venue Controller', () => {
   
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('getVenues', () => {
    it('should fetch all venues successfully', async () => {
      // Mock request and response objects
      const req = {} as any;
      const res = {
        status: jest.fn().mockReturnThis(), // Mock `status` to enable chaining
        json: jest.fn(), // Mock `json` to capture response payload
      } as any;

      // Mock the Venue.find method to return sample data
      (Venue.find as jest.Mock).mockResolvedValue([
        { _id: '1', name: 'Venue 1', address: 'Address 1', image: 'image1.png' },
        { _id: '2', name: 'Venue 2', address: 'Address 2', image: 'image2.png' },
      ]);

      // Call the getVenues function
      await getVenues(req, res);

      // Verify Venue.find was called
      expect(Venue.find).toHaveBeenCalled();

      // Verify the response status
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { _id: '1', name: 'Venue 1', address: 'Address 1', image: 'image1.png' },
        { _id: '2', name: 'Venue 2', address: 'Address 2', image: 'image2.png' },
      ]);
    });

    it('should handle errors and return 500 status', async () => {
      const req = {} as any;
      const res = {
        status: jest.fn().mockReturnThis(), // Mock `status`
        json: jest.fn(), // Mock `json`
      } as any;

      // Mock Venue.find to throw an error
      (Venue.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      // Call the getVenues function
      await getVenues(req, res);

      // Verify Venue.find was called
      expect(Venue.find).toHaveBeenCalled();

      // Verify the response status and error payload
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server issue: Error: Database error',
      });
    });
  });
});