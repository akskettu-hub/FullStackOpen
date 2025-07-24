import { Gender, HealthCheckRating, NewEntry, NewPatient } from "./types";
import * as z from "zod";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

const baseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const dischargeSchema = z.object({
  date: z.iso.date(),
  criteria: z.string(),
});

const sickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

const HospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: dischargeSchema,
});

const OccupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: sickLeaveSchema.optional(),
});

const HealthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

export const newEntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

export const toNewEntry = (object: unknown): NewEntry => {
  return newEntrySchema.parse(object);
};
