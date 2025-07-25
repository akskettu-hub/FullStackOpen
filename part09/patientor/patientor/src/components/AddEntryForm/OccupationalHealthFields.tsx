import { Box, TextField, Typography } from "@mui/material";
import { SickLeave } from "../../types";
import { format } from "date-fns";
import {
  DateRangePicker,
  MultiInputDateRangeField,
} from "@mui/x-date-pickers-pro";

interface Props {
  sickLeave: SickLeave;
  setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>;
  setEmpoyerName: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthFields = (props: Props) => {
  const handleDateChange = (value: [Date | null, Date | null]) => {
    const [start, end] = value;

    props.setSickLeave({
      startDate: start ? format(start, "yyy-MM-dd") : "",
      endDate: end ? format(end, "yyy-MM-dd") : "",
    });
  };
  return (
    <div>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Sick Leave Period
      </Typography>
      <Box mt={2}>
        <DateRangePicker
          value={[
            props.sickLeave.startDate
              ? new Date(props.sickLeave.startDate)
              : null,
            props.sickLeave.endDate ? new Date(props.sickLeave.endDate) : null,
          ]}
          onChange={handleDateChange}
          slotProps={{ field: { dateSeparator: "to" } }}
          slots={{ field: MultiInputDateRangeField }}
        />
      </Box>
      <TextField
        label="Employer Name"
        fullWidth
        size="small"
        variant="standard"
        onChange={({ target }) => props.setEmpoyerName(target.value)}
      />
    </div>
  );
};

export default OccupationalHealthFields;
