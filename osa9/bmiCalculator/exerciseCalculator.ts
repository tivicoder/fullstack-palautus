import { calculateExercises } from './exercise';

interface ParsedArgs {
  target: number;
  values: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ParsedArgs => {
  const target = Number(args[2]);
  const values = args.slice(3).map(value => Number(value));
  if (values.findIndex(value => isNaN(value)) >= 0) {
    throw new Error('argument not a number');
  }
  return {
    target,
    values
  };
};

try {
  const { target, values } = parseExerciseArguments(process.argv);
  console.log(calculateExercises({ target, values }));
} catch (e) {
  const error = <Error> e;
  console.log('something went wrong: ', error.message);
}