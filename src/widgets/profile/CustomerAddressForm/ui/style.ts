import {
  autocompleteClasses,
  formControlLabelClasses,
  typographyClasses,
} from "@mui/material";
import {
  DEFAULT_SWITCH_COLOR,
  PRIMARY_COLOR,
} from "../../../../shared/constants/colors";
import {
  TABLET_MEDIA,
  MOBILE_MEDIA,
} from "../../../../shared/constants/mediaQuery";

export const rootStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const gridContainerStyle = {
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row",
    md: "row",
  },
  justifyContent: "center",
  alignItems: "center",
};

export const gridItemStyle = {
  width: {
    xs: 220,
    sm: 250,
    md: 280,
  },
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
};

export const firstGridItemStyle = {
  marginRight: 2,
};

export const textFieldStyle = {
  marginBottom: 2,
  width: {
    xs: 220,
    sm: 250,
    md: 280,
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

export const firstTextFieldStyle = {
  ...textFieldStyle,
  marginTop: 0,
};

export const titleStyle = {
  color: PRIMARY_COLOR,
  fontWeight: 800,
  fontSize: 19,
  lineHeight: "28px",
  marginBottom: 3.5,
  [TABLET_MEDIA]: {
    fontSize: 16,
  },
  [MOBILE_MEDIA]: {
    fontSize: 13,
    marginBottom: 2.5,
  },
};
export const buttonBoxStyle = {
  margin: 0,
  marginTop: 10,
  [TABLET_MEDIA]: {
    marginLeft: 0,
  },
  [MOBILE_MEDIA]: {
    marginLeft: 0,
  },
  "@media (max-width: 590px)": {
    marginLeft: 0,
  },
  display: "flex",
  justifyContent: "center",
};

export const registerButtonStyle = {
  padding: "14px 26px",
  textAlign: "center",
  fontSize: 15,
  textTransform: "none",

  [MOBILE_MEDIA]: {
    fontSize: 11,
  },
};

export const submitButtonStyle = {
  padding: "14px 26px",
  textAlign: "center",
  fontSize: 15,
  textTransform: "none",
  [MOBILE_MEDIA]: {
    fontSize: 11,
  },
};

export const switchStyle = {
  [`.${formControlLabelClasses.root} &.${typographyClasses.root}`]: {
    fontSize: {
      xs: 9,
      sm: 10,
      md: 12,
    },
    color: DEFAULT_SWITCH_COLOR,
  },
};
export const switchBoxStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: {
    xs: "column",
    sm: "row",
    md: "row",
  },
};
export const switchItemStyle = {
  display: "flex",
  flexDirection: "column",
};
