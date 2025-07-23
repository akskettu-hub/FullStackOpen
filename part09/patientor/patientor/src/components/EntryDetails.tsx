import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../utils";

interface props {
  entry: Entry;
}

const EntryDetails = (props: props) => {
  switch (props.entry.type) {
    case "Hospital":
      return <HospitalDetails {...props.entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareCheckDetails {...props.entry} />;
    case "HealthCheck":
      return <HealthCheckDetails {...props.entry} />;
    default:
      return assertNever(props.entry);
  }
};

const HospitalDetails = (entry: HospitalEntry) => {
  return <div>Doctor: {entry.specialist}</div>;
};

const OccupationalHealthcareCheckDetails = (
  entry: OccupationalHealthcareEntry
) => {
  return <div>Doctor: {entry.specialist}</div>;
};

const HealthCheckDetails = (entry: HealthCheckEntry) => {
  const getHealthRatingColour = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
    }
  };

  return (
    <div>
      <div>
        <FavoriteIcon sx={{ color: getHealthRatingColour() }}></FavoriteIcon>
      </div>
      <div>Doctor: {entry.specialist}</div>
    </div>
  );
};

export default EntryDetails;
