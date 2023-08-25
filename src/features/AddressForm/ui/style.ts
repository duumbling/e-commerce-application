import {
  autocompleteClasses,
  formControlLabelClasses,
  typographyClasses,
} from "@mui/material";
import {
  DEFAULT_SWITCH_COLOR,
  PRIMARY_COLOR,
} from "../../../shared/constants/colors";
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

export const defaultSwitchStyle = {
  [`.${formControlLabelClasses.root} &.${typographyClasses.root}`]: {
    fontSize: 12,
    color: DEFAULT_SWITCH_COLOR,

    [TABLET_MEDIA]: {
      fontSize: 8,
    },
  },
};

export const autocompleteStyle = {
  [`&.${autocompleteClasses.root} .${autocompleteClasses.inputRoot}`]: {
    paddingTop: 1.25,
    paddingBottom: 1,
  },
};
