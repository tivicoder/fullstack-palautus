import { calculateBmi, HeightWeight } from './bmi';

export const parseArguments = (args: Array<string>): HeightWeight => {
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Non-numeric weight or height given');
  }
  return { height, weight };
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  const error = <Error> e;
  console.log('something went wrong: ', error.message);
}