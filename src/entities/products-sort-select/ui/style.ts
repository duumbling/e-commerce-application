import { inputBaseClasses } from "@mui/material";
import { PRIMARY_COLOR } from "../../../shared/constants/colors";

export const rootStyle = {
  borderRadius: 2,
  fontSize: 20,
  width: 298,
  ":focus": {
    color: PRIMARY_COLOR,
  },
  [`&.${inputBaseClasses.root} fieldset`]: {
    borderColor: PRIMARY_COLOR,
  },
};

export const selectItemStyle = {
  fontSize: 20,
};
