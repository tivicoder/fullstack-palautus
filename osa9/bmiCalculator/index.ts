import express, { Request } from 'express';
import { calculateBmi } from './bmi';
import { calculateExercises } from './exercise';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!weight || !height) {
    res.json({
      error: 'malformatted parameters'
    });
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

interface RequestBody {
  daily_exercises : Array<number>;
  target: number;
}

app.post('/exercises', (req : Request<unknown, unknown, RequestBody>, res) => {
  console.log('request: ', req.body);

  const values = req.body.daily_exercises;
  const target = req.body.target;

  if (target === undefined || !Array.isArray(values) ) {
    res.json({
      error: 'parameters missing'
    });
    return;
  }

  if (isNaN(target) || values.findIndex(value => isNaN(value)) != -1) {
    res.json({
      error: 'malformatted parameters'
    });
    return;
  }

  const result = calculateExercises({
    target, values
  });

  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});