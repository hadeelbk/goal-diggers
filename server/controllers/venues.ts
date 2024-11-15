import Venue from '../models/venue';
import { Request, Response } from 'express';


async function getVenues(req: Request, res: Response): Promise<void> {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues); 
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` });
  }
}
export { getVenues };