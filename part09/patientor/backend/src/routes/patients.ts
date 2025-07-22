import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";
import * as z from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("patient get");

  console.log(patientService.getNonSesitivePatientData());

  res.send(patientService.getNonSesitivePatientData());
});

router.post("/", (req, res) => {
  console.log("post hit");

  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unkown error" });
    }
  }
});

export default router;
