import { PRIMARY_COLOR } from "../../../shared/constants/colors";

export const rootStyle = {
  display: "flex",
  flexDirection: "column",
} as const;

export const titleStyle = {
  fontSize: 19,
  lineHeight: "28px",
  fontWeight: 800,
  color: PRIMARY_COLOR,
};

export const numberFieldStyle = {
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
};

export const formControlStyle = {
  "& .MuiFormControlLabel-label": {
    fontSize: 12,
  },
};
