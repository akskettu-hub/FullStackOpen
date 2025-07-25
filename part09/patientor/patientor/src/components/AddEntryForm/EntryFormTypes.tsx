import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { EntryType } from "../../types";
interface Props {
  type: string;
  setType: React.Dispatch<React.SetStateAction<EntryType>>;
}

interface TypeOption {
  value: EntryType;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString(),
}));

const EntryFormTypes = (props: Props) => {
  const onTypeChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const entryType = Object.values(EntryType).find(
        (et) => et.toString() === value
      );
      if (entryType) {
        props.setType(entryType);
      }
    }
  };
  return (
    <div>
      <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
      <Select
        label="Entry Type"
        fullWidth
        value={props.type}
        onChange={onTypeChange}
      >
        {typeOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default EntryFormTypes;
