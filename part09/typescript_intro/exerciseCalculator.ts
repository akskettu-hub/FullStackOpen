interface exerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: number[]): exerciseResults => {
  const target = 0.75;

  const totalExercise = dailyExerciseHours.reduce((sum, day) => sum + day, 0);
  const average = totalExercise / dailyExerciseHours.length;

  let rating: number;
  let ratingDescription: string;

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

const traningSample = [3, 0, 2, 4.5, 0, 3, 1];

try {
  console.log(calculateExercises(traningSample));
} catch (error: unknown) {
  let errorMessage = "Something went wrong. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }

  console.log(errorMessage);
}
