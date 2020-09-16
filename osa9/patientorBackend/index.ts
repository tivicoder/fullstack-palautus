import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('got ping');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});