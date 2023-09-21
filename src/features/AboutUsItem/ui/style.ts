import { typographyClasses } from "@mui/material";
import { PRIMARY_COLOR } from "../../../shared/constants/colors";

const classes = {
  root: `.${typographyClasses.root}&.${typographyClasses.body1} a`,
};

const AvatarSizes = {
  width: {
    xs: 200,
    sm: 200,
    md: 250,
  },
  height: {
    xs: 200,
    sm: 200,
    md: 250,
  },
};

export const rootStyle = {
  marginBottom: 7,
};

export const avatarStyle = {
  width: AvatarSizes.width,
  height: AvatarSizes.height,
  float: {
    xs: "bottom",
    sm: "left",
    md: "left",
  },
  shapeOutside: "circle(50%)",
  marginRight: {
    sm: 2,
    md: 2,
  },
  marginTop: 2.5,
  margin: {
    xs: "auto",
  },
};
export const bioStyle = {
  textAlign: {
    xs: "center",
    sm: "left",
    md: "left",
  },
  [classes.root]: {
    fontWeight: "bold",
    fontSize: {
      xs: 20,
      sm: 22,
      md: 28,
    },
    textDecoration: "none",
    cursor: "pointer",
    color: PRIMARY_COLOR,
  },
};
