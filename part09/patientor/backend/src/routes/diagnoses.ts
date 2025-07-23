import express from "express";
import diagnosesService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("diagnoses get");

  res.send(diagnosesService.getEntries());
});

export default router;
