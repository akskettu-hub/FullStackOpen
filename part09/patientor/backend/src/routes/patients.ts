import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";
import * as z from "zod";
import patientData from "../../data/patients-full";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("patients get");

  res.send(patientService.getNonSesitivePatientData());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("patient get by id: ", id);
  const patient = patientService.getPatientDataById(id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: `Patient not found with id: ${id}` });
  }
});

router.post("/", (req, res) => {
  console.log("post hit");

  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    patientData.push(addedPatient);
    res.json(addedPatient);

    console.log(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unkown error" });
    }
  }
});

export default router;
