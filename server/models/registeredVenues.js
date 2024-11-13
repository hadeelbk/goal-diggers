const mongoose = require('../ds.js');
const {Schema} = mongoose;

const RegisteredVenues = new Schema({
  name: {type: String},
  address: {type: String},
  image: {type: String}
});


const venues = [
  {
    name: 'Arena',
    address: "Voulis 45, Syntagma, Athens, Greece",
    image: '../football/arena.png'
  },
  {
    name: 'Diego Football Center',
    address: "Kifisias 36, Kifisia, Athens, Greece",
    image: '../football/diego.png'
  },
  {
    name: 'El Classico',
    address: "Patriarchou Ioakim 4, Kolonaki, Athens, Greece",
    image: '../football/el_classico.png'
  },
  {
    name: 'Football Madness',
    address: "Leof. Poseidonos 241, Nea Ionia, Athens, Greece",
    image: '../football/football.png'
  },
  {
    name: 'Glyfada Goals',
    address: "Saki Karagiorga 57, Glyfada, Athens, Greece",
    image: '../football/glyfada_goals.png'
  },
  {
    name: 'Kifisia KickOff',
    address: "Kifisia 24, Kifisia, Athens, Greece",
    image: '../football/kifisia_kickoff.png'
  },
  {
    name: 'Olympus Football Gods',
    address: "Chatzikosta 7, Zografou, Athens, Greece",
    image: '../football/olympus_sports.png'
  },
  {
    name: 'Football Mania',
    address: "Leof. Vouliagmenis 25, Agios Dimitrios, Athens, Greece",
    image: '../football/sport_mania.png'
  }
];

const Venue = mongoose.model('Venue', RegisteredVenues);

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

