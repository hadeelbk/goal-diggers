const mongoose = require('mongoose');

(async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('Successful connection to the database')
  } catch (error) {
    console.log(`Connection was unsuccessful due to: ${error}`)
  }
})();

module.exports = mongoose