import { Box } from "@mui/material";
import { Gender, Patient } from "../../types";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { assertNever } from "../../utils";

interface Props {
  patient: Patient;
}

const PatientDetails = (props: Props) => {
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

  return (
    <Box sx={{ fontSize: 15, fontWeight: "medium" }}>
      <h2>
        {props.patient?.name} {pickGenderIcon(props.patient.gender)}
      </h2>
      <p>SSN: {props.patient?.ssn}</p>
      <p>Occupation: {props.patient?.occupation}</p>
    </Box>
  );
};

export default PatientDetails;
