const calculateBmi = (height: number, weight: number): string => {
  const bmi = 10000 * weight / height / height;
  return (bmi > 20 && bmi < 25) ? 'Normal (healthy weight)' : 'Overweight';
};

interface HeightWeight {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): HeightWeight => {
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Non-numberic weight or height given');
  }
  return { height, weight };
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('something went wrong: ', e.message);
}