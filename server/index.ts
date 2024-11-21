import express from 'express';
import router from './router';
import cors from 'cors';

const app = express(); // Explicitly type `app` as `Application`

const PORT: number = 3000; // Explicitly type the `PORT` variable

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.use(router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});