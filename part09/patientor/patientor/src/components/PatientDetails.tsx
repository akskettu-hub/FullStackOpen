import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Gender, Patient } from "../types";

import patientService from "../services/patients";

import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./EntryDetails";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import WorkIcon from "@mui/icons-material/Work";

import { Box, ThemeProvider, createTheme } from "@mui/system";
import { assertNever } from "../utils";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetails = (props: Props) => {
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

  const pickGenderIcon = (patientGender: Gender) => {
    switch (patientGender) {
      case Gender.Male:
        return <MaleIcon></MaleIcon>;
      case Gender.Female:
        return <FemaleIcon></FemaleIcon>;
      case Gender.Other:
        return <TransgenderIcon></TransgenderIcon>;
      default:
        return assertNever(patientGender);
    }
  };

  const pickEntryTypeIcon = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return <LocalHospitalIcon></LocalHospitalIcon>;
      case "OccupationalHealthcare":
        return <WorkIcon></WorkIcon>;
      case "HealthCheck":
        return <HealthAndSafetyIcon></HealthAndSafetyIcon>;
      default:
        return assertNever(entry);
    }
  };

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
        <Box sx={{ color: "text.primary", fontSize: 15, fontWeight: "medium" }}>
          <h2>
            {patient?.name} {pickGenderIcon(patient.gender)}
          </h2>
          <p>SSN: {patient?.ssn}</p>
          <p>Occupation: {patient?.occupation}</p>

          <h3>Entries:</h3>
        </Box>
        {patient.entries.map((entry) => (
          <Box
            key={entry.id}
            sx={{
              bgcolor: "background.grayish",
              color: "text.secondary",
              fontSize: 15,
              fontWeight: "medium",
              border: 3,
              borderRadius: 2,
              p: 1,
              mb: 1,
            }}
          >
            <div key={entry.id}>
              <div>
                <strong>{entry.date}</strong> {pickEntryTypeIcon(entry)}
              </div>
              <em>{entry.description}</em>
              <ul>
                {entry.diagnosisCodes?.map((code) => (
                  <li key={code}>
                    {code}{" "}
                    {props.diagnoses.find((diag) => diag.code === code)?.name}
                  </li>
                ))}
              </ul>
              <EntryDetails entry={entry} />
            </div>
          </Box>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default PatientDetails;
