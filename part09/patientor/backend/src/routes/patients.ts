import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("patient get");

  console.log(patientService.getNonSesitivePatientData());

  res.send(patientService.getNonSesitivePatientData());
});

export default router;
