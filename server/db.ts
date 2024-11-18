import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv'

dotenv.config()

if (process.env.NODE_ENV !== 'TEST') {

  (async function main() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/goaldiggers');
      console.log('Successful connection to the database');
    } catch (error) {
      console.log(`Connection was unsuccessful due to: ${error}`);
    }
  })();

}

export = mongoose;