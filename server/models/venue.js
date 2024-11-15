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
    image: '../assets/arena.png'
  },
  {
    name: 'Diego assets Center',
    address: "Kifisias 36, Kifisia, Athens, Greece",
    image: '../assets/diego.png'
  },
  {
    name: 'El Classico',
    address: "Patriarchou Ioakim 4, Kolonaki, Athens, Greece",
    image: '../assets/el_classico.png'
  },
  {
    name: 'assets Madness',
    address: "Leof. Poseidonos 241, Nea Ionia, Athens, Greece",
    image: '../assets/assets.png'
  },
  {
    name: 'Glyfada Goals',
    address: "Saki Karagiorga 57, Glyfada, Athens, Greece",
    image: '../assets/glyfada_goals.png'
  },
  {
    name: 'Kifisia KickOff',
    address: "Kifisia 24, Kifisia, Athens, Greece",
    image: '../assets/kifisia_kickoff.png'
  },
  {
    name: 'Olympus assets Gods',
    address: "Chatzikosta 7, Zografou, Athens, Greece",
    image: '../assets/olympus_sports.png'
  },
  {
    name: 'assets Mania',
    address: "Leof. Vouliagmenis 25, Agios Dimitrios, Athens, Greece",
    image: '../assets/sport_mania.png'
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

