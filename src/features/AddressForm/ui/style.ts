import {
  autocompleteClasses,
  formControlLabelClasses,
  typographyClasses,
} from "@mui/material";
import {
  DEFAULT_SWITCH_COLOR,
  PRIMARY_COLOR,
} from "../../../shared/constants/colors";

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

export const defaultSwitchStyle = {
  [`.${formControlLabelClasses.root} &.${typographyClasses.root}`]: {
    fontSize: 12,
    color: DEFAULT_SWITCH_COLOR,
  },
};

export const autocompleteStyle = {
  [`&.${autocompleteClasses.root} .${autocompleteClasses.inputRoot}`]: {
    paddingTop: 0.9,
    paddingBottom: 1,
  },
  display: "flex",
  flexDirection: "column",
};
