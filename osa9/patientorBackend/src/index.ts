import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('got ping');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});