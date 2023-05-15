import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { useState } from "react";

export default function Select(props) {
  const { name, label, value, setValue, error = null, options } = props;
  const [valueData, setValueData] = useState(value);

  return (
    <FormControl variant="outlined" fullWidth {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={valueData}
        onChange={(e) => {
          if (setValue) setValue(e.target.value);
          setValueData(e.target.value);
        }}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((item, index) => {
          return (
            <MenuItem key={index} value={item.id}>
              {item.title}
            </MenuItem>
          );
        })}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
