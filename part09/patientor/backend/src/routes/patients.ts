import express, { Request, Response } from "express";
import patientService from "../services/patientService";

import { Entry, NewEntry, NewPatient, Patient } from "../types";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { newEntryParser } from "../middleware/newEntryParser";
import { newPatientParser } from "../middleware/newPatientParser";

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

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
    console.log("patient added successfully", addedPatient);
  }
);

type IdParam = { id: string };

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<IdParam, unknown, NewEntry>, res: Response<Entry>) => {
    const id = req.params.id;
    console.log("add entries hit for: ", id);

    const addedEntry = patientService.addEntry(id, req.body);
    console.log("adding entry successsful: ", addedEntry);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
