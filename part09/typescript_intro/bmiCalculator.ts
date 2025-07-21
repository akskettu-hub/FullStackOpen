interface bmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else throw new Error("Provided values are not numbers!");
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  switch (true) {
    case bmi < 18.5:
      return "Underweight";
    case bmi >= 18.5 && bmi <= 24.9:
      return "Normal range";
    case bmi >= 25 && bmi <= 29.9:
      return "Overweight";
    case bmi >= 30:
      return "Obese";
  }

  return "caluation failed";
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "BMI calulator failed. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}
