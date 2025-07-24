import {
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../utils";

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
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
      default:
        return assertNever(entry.healthCheckRating);
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

export default EntryDetails;
