import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";

import patientService from "../../services/patients";

import { useEffect, useState } from "react";

import EntryDetails from "./EntryDetails";

import { Box, ThemeProvider, createTheme } from "@mui/system";
import PatientDetails from "./PatientDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = (props: Props) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (typeof id === "string") {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>loading...</div>;
  }

  const theme = createTheme({
    palette: {
      background: {
        paper: "#fff",
        grayish: "#d5d5db",
      },
      text: {
        primary: "#173A5E",
        secondary: "#161617",
      },
      action: {
        active: "#001E3C",
      },
      success: {
        dark: "#009688",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <PatientDetails patient={patient} />
        <EntryDetails entries={patient.entries} diagnoses={props.diagnoses} />
      </Box>
    </ThemeProvider>
  );
};

export default PatientDetailsPage;
