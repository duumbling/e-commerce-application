import { InputColors } from "../../../shared/constants/colors";
import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";
import { CONTAINED_BUTTON_PADDINGS } from "../../../shared/constants/sizes";

export const rootStyle = {
  [TABLET_MEDIA]: {
    marginLeft: 0,
  },
};

export const gridContainerProps = {
  container: true,
  rowSpacing: 3,
  columns: 1,
  justifyContent: "center",
};

export const gridItemProps = {
  item: true,
  xs: 1,
  sm: 1,
  md: 1,
  display: "flex",
  justifyContent: "center",
};

export const textFieldStyle = {
  marginTop: 2.75,
  width: "255px",
};

export const firstTextFieldStyle = {
  ...textFieldStyle,
  marginTop: 0,
};

export const loginButtonStyle = {
  marginTop: 3.12,
  padding: CONTAINED_BUTTON_PADDINGS,
  textAlign: "center",
  fontSize: 15,
  textTransform: "none",
  [MOBILE_MEDIA]: {
    fontSize: 11,
  },
  color: "#fff",
};

export const linkStyle = {
  display: "block",
  marginTop: 1.6,
  fontWeight: 600,
  fontSize: 11,
  color: InputColors.TEXT,
  [MOBILE_MEDIA]: {
    fontSize: 8,
  },
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
};
