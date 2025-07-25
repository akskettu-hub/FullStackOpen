import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";

interface Props {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;

  setDescription: React.Dispatch<React.SetStateAction<string>>;

  setSpecialist: React.Dispatch<React.SetStateAction<string>>;

  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

const CommonEntryFields = (props: Props) => {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      props.setDate(formattedDate);

      console.log(date);
    } else {
      props.setDate("");
    }
  };
  return (
    <div>
      <DatePicker
        label="Date"
        value={props.date ? new Date(props.date) : null}
        onChange={(value) => handleDateChange(value)}
        slotProps={{ textField: { size: "small" } }}
      />

      <TextField
        label="Description"
        fullWidth
        size="small"
        variant="standard"
        onChange={({ target }) => props.setDescription(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        size="small"
        variant="standard"
        onChange={({ target }) => props.setSpecialist(target.value)}
      />
      <TextField
        label="Diagnosis Codes"
        fullWidth
        size="small"
        variant="standard"
        onChange={({ target }) =>
          props.setDiagnosisCodes(
            target.value
              .split(",")
              .map((code) => code.trim())
              .filter((code) => code !== "")
          )
        }
      />
    </div>
  );
};

export default CommonEntryFields;
