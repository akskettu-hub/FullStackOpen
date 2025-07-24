import { Box, Button, TextField, Grid, Alert } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";
import { HealthCheckRating, Patient } from "../../types";
import axios from "axios";

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
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const addedEntry = await patientService.addEntry(
        {
          date: date,
          description: description,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes,
          healthCheckRating: healthCheckRating,
          type: "HealthCheck",
        },
        props.patientId
      );

      console.log(addedEntry);

      props.setPatient({
        ...props.patient,
        entries: [...props.patient.entries, addedEntry],
      });
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
              element.message &&
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
        <h3>New Healthcheck entry</h3>
        <form onSubmit={onSubmit}>
          <TextField
            label="Date"
            fullWidth
            size="small"
            variant="standard"
            onChange={({ target }) => setDate(target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            size="small"
            variant="standard"
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            size="small"
            variant="standard"
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            label="Diagnosis Codes"
            fullWidth
            size="small"
            variant="standard"
            onChange={({ target }) =>
              setDiagnosisCodes(
                target.value
                  .split(",")
                  .map((code) => code.trim())
                  .filter((code) => code !== "")
              )
            }
          />
          <TextField
            label="Health Rating"
            fullWidth
            size="small"
            variant="standard"
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value))
            }
          />

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
        </form>
      </Box>
    </div>
  );
};

export default AddEntryForm;
