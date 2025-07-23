import { useParams } from "react-router-dom";
import { Patient } from "../types";

import patientService from "../services/patients";
import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientDetails = () => {
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

  const pickGenderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <MaleIcon></MaleIcon>;
      case "female":
        return <FemaleIcon></FemaleIcon>;
      case "other":
        return <TransgenderIcon></TransgenderIcon>;
    }
  };

  const genderIcon = pickGenderIcon();

  console.log(patient.entries);

  return (
    <div>
      <h2>
        {patient?.name} {genderIcon}
      </h2>
      <p>SSN: {patient?.ssn}</p>
      <p>Occupation: {patient?.occupation}</p>

      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <div>
            <strong>{entry.date}</strong> <em>{entry.description}</em>
          </div>
          <ul>
            {entry.diagnosisCodes?.map((codes) => (
              <li>{codes}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientDetails;
