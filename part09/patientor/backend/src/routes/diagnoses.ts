import express from "express";
import diagnosesService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("diagnoses get");

  console.log(diagnosesService.getEntries());

  res.send(diagnosesService.getEntries());
});

export default router;
