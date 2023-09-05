import {
  cardClasses,
  cardHeaderClasses,
  formControlLabelClasses,
  typographyClasses,
} from "@mui/material";
import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";
import { DEFAULT_SWITCH_COLOR } from "../../../shared/constants/colors";

const classes = {
  cardHeaderRoot: `.${cardClasses.root}.${cardHeaderClasses.root}`,
  cardHeaderContent: `.${cardHeaderClasses.content}`,
  cardTitle: `.${cardHeaderClasses.title}`,
};

export const rootStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const cardStyle = {
  item: true,
  width: {
    xs: 360,
    sm: 600,
    md: 700,
  },
  cursor: "pointer",
  ":hover": {
    boxShadow: "0 0 14px grey",
  },
  borderRadius: "0",
  marginBottom: 0.1,
};

export const cardHeaderStyle = {
  [classes.cardHeaderRoot]: {
    padding: 0,
    border: "1px solid red",
  },
  [classes.cardHeaderContent]: {
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
      md: "row",
    },
    columnGap: {
      xs: 6,
      sm: 6,
      md: 8,
    },
    rowGap: 1,
  },
  [classes.cardTitle]: {
    paddingTop: {
      xs: 1,
      sm: 0,
      md: 0,
    },
    fontWeight: 100,
    fontSize: {
      xs: 14,
      sm: 18,
      md: 20,
    },
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
