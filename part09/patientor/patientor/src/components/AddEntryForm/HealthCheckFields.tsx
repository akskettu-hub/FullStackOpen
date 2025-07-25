import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { HealthCheckRating } from "../../types";

interface HealthRatingOption {
  value: HealthCheckRating;
  label: string;
}

const ratingOptions: HealthRatingOption[] = Object.keys(HealthCheckRating)
  .filter((key) => isNaN(Number(key)))
  .map((key) => ({
    value: HealthCheckRating[key as keyof typeof HealthCheckRating],
    label: key,
  }));

interface Props {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

const HealthCheckFields = (props: Props) => {
  const onRatingChange = (event: SelectChangeEvent<number>) => {
    props.setHealthCheckRating(event.target.value as HealthCheckRating);
  };
  return (
    <div>
      <InputLabel style={{ marginTop: 20 }}>Health Rating</InputLabel>
      <Select<number>
        label="Health Rating"
        fullWidth
        value={props.healthCheckRating}
        onChange={onRatingChange}
      >
        {ratingOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default HealthCheckFields;
