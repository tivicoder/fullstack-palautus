interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratingDescriptions = [
  'try a bit harder next time',
  'not too bad but could be better',
  'way to go dudemeister!'
];

export interface ExerciseInput {
  target: number;
  values: Array<number>;
}

export const calculateExercises = ({ target, values }: ExerciseInput): ExerciseResult => {
  const periodLength = values.length;
  const trainingDays = values.filter(value => value > 0).length;
  const average = values.reduce((sum, value) => sum + value) / values.length;
  const success = average < target ? false : true;
  let rating: number;
  if (average < target/2) {
    rating = 1;
  } else if (average < target) {
    rating = 2;
  } else {
    rating = 3;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescriptions[rating-1],
    target,
    average
  };
};