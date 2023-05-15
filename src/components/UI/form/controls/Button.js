// import { Button as MuiButton, makeStyles } from "@mui/material";
import { Button as MuiButton } from "@mui/material";

export default function Button(props) {
  const { sx, text, size, color, variant, onClick, ...other } = props;

  return (
    <MuiButton
      sx={sx}
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      // classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}
