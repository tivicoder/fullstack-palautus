import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});