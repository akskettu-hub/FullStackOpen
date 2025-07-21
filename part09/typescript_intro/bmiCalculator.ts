interface bmiValues {
  height: number;
  weight: number;
}

interface bmiQueryResponseValues {
  height: number;
  weight: number;
  bmi: string;
}

interface bmiQueryResponseError {
  error: string;
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

const parseQueryArgs = (queryArgs: any): bmiValues => {
  if (
    typeof queryArgs === "object" &&
    "height" in queryArgs &&
    "weight" in queryArgs
  ) {
    if (!isNaN(Number(queryArgs.height)) && !isNaN(Number(queryArgs.weight))) {
      return {
        height: Number(queryArgs.height),
        weight: Number(queryArgs.weight),
      };
    } else throw new Error("arguments are not numbers");
  } else
    throw new Error("query must be object that has fields height and weight");
};

const bmiCalculator = (
  queryArgs: any
): bmiQueryResponseValues | bmiQueryResponseError => {
  try {
    const { height, weight } = parseQueryArgs(queryArgs);
    const bmi = calculateBmi(height, weight);
    console.log(bmi);
    return {
      height,
      weight,
      bmi,
    };
  } catch (error: unknown) {
    let errorMessage = "BMI calulator failed. ";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    console.log(errorMessage);
    return {
      error: "malformatted parameters",
    };
  }
};

if (require.main === module) {
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
}

export default bmiCalculator;
