import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";

import { NewPatient, NonSensitivePatientData, Patient } from "../types";

const getNonSesitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...patient,
  };

  return newPatient;
};

export default { getNonSesitivePatientData, addPatient };
