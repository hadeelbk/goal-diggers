const mongoose = require('../db.js');
const {Schema} = mongoose;

const VenueSchema = new Schema({
  name: {type: String},
  address: {type: String},
  image: {type: String}
});

const venues = [
  {
    name: 'Arena',
    address: "Voulis 45, Syntagma, Athens, Greece",
    image: 'arena'
  },
  {
    name: 'Diego assets Center',
    address: "Kifisias 36, Kifisia, Athens, Greece",
    image: 'diego'
  },
  {
    name: 'El Classico',
    address: "Patriarchou Ioakim 4, Kolonaki, Athens, Greece",
    image: 'el_classico'
  },
  {
    name: 'assets Madness',
    address: "Leof. Poseidonos 241, Nea Ionia, Athens, Greece",
    image: 'football_madness'
  },
  {
    name: 'Glyfada Goals',
    address: "Saki Karagiorga 57, Glyfada, Athens, Greece",
    image: 'glyfada_goals'
  },
  {
    name: 'Kifisia KickOff',
    address: "Kifisia 24, Kifisia, Athens, Greece",
    image: 'kifisia_kickoff'
  },
  {
    name: 'Olympus assets Gods',
    address: "Chatzikosta 7, Zografou, Athens, Greece",
    image: 'olympus_sports'
  },
  {
    name: 'assets Mania',
    address: "Leof. Vouliagmenis 25, Agios Dimitrios, Athens, Greece",
    image: 'sport_mania'
  }
];

const Venue = mongoose.model('Venue', VenueSchema);

async function populateVenues() {
  try {
    const existingVenues = await Venue.countDocuments();
    if (existingVenues === 0) {
      await Venue.insertMany(venues);
      console.log('The table was populated successfully');
    } else {
      console.log('Venues already exist. No data inserted.');
    }
  } catch (error) {
    console.log(`The table wasn't populated due to: ${error}`);
  }
};

populateVenues();

module.exports = Venue;

