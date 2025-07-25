import { Box, Button, Grid, Alert } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";
import {
  Discharge,
  EntryType,
  HealthCheckRating,
  Patient,
  SickLeave,
} from "../../types";
import axios from "axios";
import EntryFormTypes from "./EntryFormTypes";
import { assertNever } from "../../utils";
import OccupationalHealthFields from "./OccupationalHealthFields";
import HospitalFields from "./HospitalFields";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CommonEntryFields from "./CommonEntryFields";
import HealthCheckFields from "./HealthCheckFields";

interface Props {
  patientId: string;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const AddEntryForm = (props: Props) => {
  const [error, setError] = useState<string>();
  const [formIsHidden, setFormIsHidden] = useState<boolean>(true);

  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [type, setType] = useState(EntryType.HealthCheck);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });

  const [employerName, setEmpoyerName] = useState<string>("");

  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(date);

    try {
      const baseEntry = {
        date: date,
        specialist: specialist,
        description: description,
        diagnosisCodes: diagnosisCodes,
        type: type,
      };

      const getEntryTypeFields = () => {
        switch (type) {
          case EntryType.HealthCheck:
            return { healthCheckRating: healthCheckRating };
          case EntryType.Hospital:
            return { discharge: discharge };
          case EntryType.OccupationalHealthcare:
            return {
              employerName: employerName,
              ...(sickLeave.startDate && sickLeave.endDate
                ? { sickLeave }
                : {}),
            };
          default:
            return assertNever(type);
        }
      };

      const entryTypeFields = getEntryTypeFields();

      const addedEntry = await patientService.addEntry(
        {
          ...baseEntry,
          ...entryTypeFields,
        },
        props.patientId
      );

      console.log(addedEntry);

      props.setPatient({
        ...props.patient,
        entries: [...props.patient.entries, addedEntry],
      });
      setError("");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && Array.isArray(e?.response?.data.error)) {
          const serverErrors = e.response.data.error;

          let errorMessages: string[] = [];
          serverErrors.forEach((element: unknown) => {
            if (
              typeof element === "object" &&
              element !== null &&
              "message" in element &&
              typeof element.message === "string"
            ) {
              errorMessages = errorMessages.concat(element.message);
            }
          });

          const errorMessage =
            "Something went wrong. Error:" + " " + errorMessages.join(", ");

          console.error(errorMessage);
          setError(errorMessage);
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
  };

  const toggleFormIsHidden = () => {
    setFormIsHidden(!formIsHidden);
  };

  if (formIsHidden) {
    return (
      <div>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={toggleFormIsHidden}
        >
          Add Entry
        </Button>
      </div>
    );
  }

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        sx={{
          fontSize: 15,
          fontWeight: "medium",
          border: 2,
          borderRadius: 2,
          p: 1,
          mb: 1,

          borderStyle: "dotted",

          padding: 2,
        }}
      >
        <h3>New {type} entry</h3>
        <form onSubmit={onSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CommonEntryFields
              date={date}
              setDate={setDate}
              setDescription={setDescription}
              setSpecialist={setSpecialist}
              setDiagnosisCodes={setDiagnosisCodes}
            />

            <EntryFormTypes type={type} setType={setType} />
            {type === "HealthCheck" && (
              <HealthCheckFields
                healthCheckRating={healthCheckRating}
                setHealthCheckRating={setHealthCheckRating}
              />
            )}
            {type === "OccupationalHealthcare" && (
              <OccupationalHealthFields
                sickLeave={sickLeave}
                setEmpoyerName={setEmpoyerName}
                setSickLeave={setSickLeave}
              />
            )}
            {type === "Hospital" && (
              <HospitalFields setDischarge={setDischarge} />
            )}

            <Grid container justifyContent="space-between" spacing={2} mt={2}>
              <Grid item>
                <Button
                  color="error"
                  variant="contained"
                  type="submit"
                  onClick={toggleFormIsHidden}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </form>
      </Box>
    </div>
  );
};

export default AddEntryForm;
