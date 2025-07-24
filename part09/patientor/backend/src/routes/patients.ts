import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";
import * as z from "zod";

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

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  console.log("add entries hit for: ", id);

  try {
    const newEntry = toNewEntry(req.body);
    console.log("zod successful");
    const addedEntry = patientService.addEntry(id, newEntry);
    console.log("adding entry successsful: ", addedEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      res.status(400).send({ error: error.issues });
    } else {
      console.log(error);
      res.status(400).send({ error: "unkown error" });
    }
  }
});

export default router;
