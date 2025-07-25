import {
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../../utils";

const HospitalDetails = (entry: HospitalEntry) => {
  return (
    <div>
      <div>Doctor: {entry.specialist}</div>
      <div>Discharged on: {entry.discharge.date}</div>
      <div>Discharge criteria: {entry.discharge.criteria}</div>
    </div>
  );
};

const OccupationalHealthcareCheckDetails = (
  entry: OccupationalHealthcareEntry
) => {
  return (
    <div>
      <div>Doctor: {entry.specialist}</div>
      <div>Employer name: {entry.employerName}</div>
      {entry.sickLeave &&
      entry.sickLeave.startDate &&
      entry.sickLeave.endDate ? (
        <div>
          Sick leave: {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}
        </div>
      ) : (
        <div>Sick leave not granted</div>
      )}
    </div>
  );
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

const EntryTypeDetails = (props: props) => {
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

export default EntryTypeDetails;
