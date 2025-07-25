import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";

import patientService from "../../services/patients";

import { useEffect, useState } from "react";

import EntryDetails from "./EntryDetails";

import { Box } from "@mui/system";
import PatientDetails from "./PatientDetails";
import AddEntryForm from "../AddEntryForm";

interface Props {
  diagnoses: Diagnosis[];
  patients: Patient[];
}

const PatientDetailsPage = (props: Props) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      // TODO: error handling
      if (typeof id === "string") {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient || !id) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Box
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <PatientDetails patient={patient} />
        <AddEntryForm
          patientId={id}
          patient={patient}
          setPatient={setPatient}
        />
        <EntryDetails entries={patient.entries} diagnoses={props.diagnoses} />
      </Box>
    </div>
  );
};

export default PatientDetailsPage;
