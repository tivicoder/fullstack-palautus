const calculateBmi = (height: number, weight: number): string => {
  const bmi = 10000 * weight / height / height;
  return (bmi > 20 && bmi < 25) ? 'Normal (healthy weight)' : 'Abnormal';
};

console.log(calculateBmi(180, 74));