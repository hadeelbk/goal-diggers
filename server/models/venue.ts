import { Schema, Document, Model } from 'mongoose';
import { Venue as IVenueBase } from '../@types/model/venue';
import mongoose from '../db';


// Extend the Venue interface to include Mongoose-specific fields
export interface IVenue extends IVenueBase, Document {}

// Define the Mongoose schema for a Venue
const VenueSchema: Schema<IVenue> = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: true },
  capacity: { type: Number }, // Optional capacity field
});


const venues = [
  {
    name: 'Arena',
    address: 'Voulis 45, Syntagma, Athens, Greece',
    image: 'arena',
    capacity: 1000, // Add capacity if needed
  },
  {
    name: 'Diego assets Center',
    address: 'Kifisias 36, Kifisia, Athens, Greece',
    image: 'diego',

  },
  {
    name: 'El Classico',
    address: 'Patriarchou Ioakim 4, Kolonaki, Athens, Greece',
    image: 'el_classico',

  },
  {
    name: 'assets Madness',
    address: 'Leof. Poseidonos 241, Nea Ionia, Athens, Greece',
    image: 'football_madness',

  },
  {
    name: 'Glyfada Goals',
    address: 'Saki Karagiorga 57, Glyfada, Athens, Greece',
    image: 'glyfada_goals',

  },
  {
    name: 'Kifisia KickOff',
    address: 'Kifisia 24, Kifisia, Athens, Greece',
    image: 'kifisia_kickoff',

  },
  {
    name: 'Olympus assets Gods',
    address: 'Chatzikosta 7, Zografou, Athens, Greece',
    image: 'olympus_sports',

  },
  {
    name: 'assets Mania',
    address: 'Leof. Vouliagmenis 25, Agios Dimitrios, Athens, Greece',
    image: 'sport_mania',
  },
];

const Venue: Model<IVenue> = mongoose.model<IVenue>('Venue', VenueSchema);

const populateVenues = async (): Promise<void> => {
  try {
    const existingVenues = await Venue.countDocuments();
    console.log(existingVenues);
    if (existingVenues === 0) {
      await Venue.insertMany(venues);
      console.log('The venues collection was populated successfully.');
    } else {
      console.log('Venues already exist. No data inserted.');
    }
  } catch (error) {
    console.error(`Failed to populate venues collection: ${error}`);
  }
};

// Call the seeding function
populateVenues().catch((error) => console.error('Error populating venues:', error));

export default Venue;