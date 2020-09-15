export interface HeightWeight {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = 10000 * weight / height / height;
  if (bmi < 20) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else {
    return 'Overweight';
  }
};