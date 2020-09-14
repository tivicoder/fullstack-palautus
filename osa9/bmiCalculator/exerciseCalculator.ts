interface Result {
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

const calculateExercises = (values: Array<number>): Result => {
  const periodLength = values.length;
  const trainingDays = values.filter(value => value > 0).length;
  const average = values.reduce((sum, value) => sum + value) / values.length;
  const target = 2;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1] ));