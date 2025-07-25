import { Box, TextField } from "@mui/material";
import { Discharge } from "../../types";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";

interface Props {
  setDischarge: React.Dispatch<React.SetStateAction<Discharge>>;
}

const HospitalFields = (props: Props) => {
  const [date, setDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const handleFieldChange = () =>
    props.setDischarge({ date: date, criteria: criteria });

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setDate(formattedDate);

      console.log(date);
    } else {
      setDate("");
    }
  };

  const onCriteriaChange = (value: string) => {
    setCriteria(value);
    handleFieldChange();
  };

  return (
    <div>
      <Box mt={2}>
        <DatePicker
          label="Date of Discharge"
          value={date ? new Date(date) : null}
          onChange={(value) => handleDateChange(value)}
          slotProps={{ textField: { size: "small" } }}
        />
      </Box>

      <TextField
        label="Criteria"
        fullWidth
        size="small"
        variant="standard"
        onChange={({ target }) => onCriteriaChange(target.value)}
      />
    </div>
  );
};

export default HospitalFields;
