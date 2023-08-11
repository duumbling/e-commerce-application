import { autocompleteClasses } from "@mui/material";
import { PRIMARY_COLOR } from "../../../shared/constants/colors";
import { TABLET_MEDIA } from "../../../shared/constants/mediaQuery";

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

    [TABLET_MEDIA]: {
      fontSize: 8,
    },
  },
};

export const autocompleteStyle = {
  [`& .${autocompleteClasses.root}${autocompleteClasses.input}`]: {
    paddingTop: 1.25,
    paddingBottom: 1.25,
  },
};
