import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseGenericPatientField = (field: unknown) => {
  if (!isString(field)) {
    throw new Error("Incorrect or missing field");
  }

  return field;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }

  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseGenericPatientField(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseGenericPatientField(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseGenericPatientField(object.occupation),
    };

    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatient;
