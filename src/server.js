import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger';
import { notFoundHandler } from './middleware/notFoundHandler';
import { errorHandler } from './middleware/errorHandler';
import { connectMongoDB } from './db/connectMongoDB';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

app.get('/notes', (req, res) => {
  res.status(200).json({ "message": "Retrieved all notes" });
});

app.get('/notes/:noteId', (req, res) => {
  res.status(200).json({ "message": `Retrieved note with ID: ${req.params.noteId}` });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
