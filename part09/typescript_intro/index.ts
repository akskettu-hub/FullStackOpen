import express from "express";
import bmiCalculator from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  res.send(bmiCalculator(req.query));
});

app.post("/exercises", (req, res) => {
  console.log(req.body);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).send({ error: "paramater missing" });
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((item) => typeof item === "number")
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.send(calculateExercises(target, daily_exercises))
  );
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
