import { InputColors, PRIMARY_COLOR } from "../../../shared/constants/colors";
import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";

export const rootStyle = {
  marginTop: "25px",
  marginLeft: "15%",
  "@media (max-width: 950px)": {
    marginLeft: "5%",
  },
  "@media (max-width: 700px)": {
    marginLeft: 0,
  },
  textAlign: "left",
};

export const gridContainerProps = {
  container: true,
  columnSpacing: { xs: 12, sm: 2, md: 12 },
  rowSpacing: { xs: 4, sm: 6, md: 8 },
  justifyContent: {
    xs: "center",
    sm: "space-evenly",
    md: "center",
  },
};

export const firstGridItemProps = {
  item: true,
  xs: false,
  sm: 10,
  md: 10,
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
  marginBottom: 2.75,
  width: "255px",
};

export const firstTextFieldStyle = {
  ...textFieldStyle,
  marginTop: 0,
};

export const buttonBoxStyle = {
  marginLeft: "10%",
  [TABLET_MEDIA]: {
    marginLeft: 10,
  },
  [MOBILE_MEDIA]: {
    marginLeft: 0.8,
  },
  "@media (max-width: 590px)": {
    marginLeft: 0,
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
