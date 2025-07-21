interface exerciseValues {
  target: number;
  exercisePerDay: number[];
}

const parseExcerciseArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (isNaN(Number(args[2]))) throw new Error("target is not a number");

  const exerciseDayArgs = args.slice(3, args.length);

  const exercisePerDay: number[] = [];
  for (const day of exerciseDayArgs) {
    if (isNaN(Number(day))) {
      throw new Error(`Entry ${day} is not a number`);
    }
    exercisePerDay.push(Number(day));
  }

  return {
    target: Number(args[2]),
    exercisePerDay: exercisePerDay,
  };
};

interface exerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  target: number,
  dailyExerciseHours: number[]
): exerciseResults => {
  const totalExercise = dailyExerciseHours.reduce((sum, day) => sum + day, 0);
  const average = totalExercise / dailyExerciseHours.length;

  let rating: number = 0;
  let ratingDescription: string = "";

  switch (true) {
    case average < target: {
      rating = 1;
      ratingDescription = "Below target";
      break;
    }
    case average >= target && average <= target * 2: {
      rating = 2;
      ratingDescription = "target reached";
      break;
    }
    case average >= target * 2: {
      rating = 3;
      ratingDescription = "Over twice the target";
      break;
    }
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((n) => n > 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};



try {
  const { target, exercisePerDay } = parseExcerciseArguments(process.argv);
  console.log(calculateExercises(target, exercisePerDay));
} catch (error: unknown) {
  let errorMessage = "Something went wrong. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }

  console.log(errorMessage);
}
