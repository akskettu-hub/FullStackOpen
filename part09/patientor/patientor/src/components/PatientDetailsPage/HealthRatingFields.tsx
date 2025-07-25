import { TextField } from "@mui/material";
import { HealthCheckRating } from "../../types";

interface Props {
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

const HealthRatingFields = (props: Props) => {
  return (
    <TextField
      label="Health Rating"
      fullWidth
      size="small"
      variant="standard"
      onChange={({ target }) =>
        props.setHealthCheckRating(Number(target.value))
      }
    />
  );
};

export default HealthRatingFields;
