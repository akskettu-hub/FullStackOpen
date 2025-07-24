import patientData from "../../data/patients-full";
import { v1 as uuid } from "uuid";

import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatientData,
  Patient,
} from "../types";

const getNonSesitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientDataById = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const getNonSesitivePatientDataById = (
  id: string
): NonSensitivePatientData | undefined => {
  const patient = patientData.find((patient) => patient.id === id);

  if (patient) {
    return {
      id: patient?.id,
      name: patient?.name,
      dateOfBirth: patient?.dateOfBirth,
      gender: patient?.gender,
      occupation: patient?.occupation,
    };
  } else return;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };

  patientData.push(newPatient);

  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patientRecord = patientData.find((patient) => patient.id === patientId);

  if (!patientRecord) {
    throw new Error(`Patient with id${patientId} not found`);
  }

  patientRecord.entries.push(newEntry);

  return newEntry;
};

export default {
  getNonSesitivePatientData,
  getPatientDataById,
  getNonSesitivePatientDataById,
  addPatient,
  addEntry,
};
