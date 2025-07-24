import { Box } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import EntryTypeDetails from "./EntryTypeDetails";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import WorkIcon from "@mui/icons-material/Work";

import { assertNever } from "../../utils";

interface Props {
  diagnoses: Diagnosis[];
  entries: Entry[];
}

const EntryDetails = (props: Props) => {
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

  return (
    <div>
      <div>
        <h3>Entries:</h3>
      </div>
      {props.entries.map((entry) => (
        <Box
          key={entry.id}
          sx={{
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
            <EntryTypeDetails entry={entry} />
          </div>
        </Box>
      ))}
    </div>
  );
};

export default EntryDetails;
