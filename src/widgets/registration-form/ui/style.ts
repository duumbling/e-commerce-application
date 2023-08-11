import { InputColors, PRIMARY_COLOR } from "../../../shared/constants/colors";
import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";

export const rootStyle = {
  marginLeft: "12vw",
  [TABLET_MEDIA]: {
    marginLeft: 0,
  },
};

export const gridContainerProps = {
  container: true,
  columnSpacing: { xs: 12, sm: 3, md: 12 },
  rowSpacing: { xs: 4, sm: 6, md: 8 },
  justifyContent: {
    xs: "center",
    sm: "space-evenly",
    md: "center",
  },
};

export const gridItemProps = {
  item: true,
  xs: false,
  sm: 5,
  md: 5,
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

export const textFieldStyle = {
  marginTop: 2.75,
  width: "255px",
};

export const firstTextFieldStyle = {
  ...textFieldStyle,
  marginTop: 0,
};

export const buttonBoxStyle = {
  marginLeft: 3,
  [MOBILE_MEDIA]: {
    margin: 0,
  },
};

export const commonAddressSwitchLabelStyle = {
  textAlign: "center",
  fontWeight: 600,
  color: PRIMARY_COLOR,
  [TABLET_MEDIA]: {
    fontSize: 8,
  },
};

export const registerButtonStyle = {
  marginTop: 3.12,
  padding: "14px 26px",
  textAlign: "center",
  fontSize: 15,
  textTransform: "none",

  [MOBILE_MEDIA]: {
    fontSize: 11,
  },
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
};
