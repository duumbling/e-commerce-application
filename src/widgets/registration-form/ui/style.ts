import { InputColors, PRIMARY_COLOR } from "../../../shared/constants/colors";
import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";

export const rootStyle = {
  maxWidth: 922,
  margin: "auto",
};

export const gridContainerProps = {
  container: true,
  columnSpacing: { xs: 0, sm: 4, md: 8 },
  rowSpacing: { xs: 4, sm: 6, md: 8 },
  justifyContent: "space-around",
};

export const gridItemProps = {
  item: true,
  xs: false,
  sm: 5,
  md: 4,
};

export const addressBoxStyle = {
  marginTop: 11.5,

  [MOBILE_MEDIA]: {
    marginTop: 4.5,
  },
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

export const commonAddressSwitchLabelStyle = {
  display: "block",
  textAlign: "center",
  fontWeight: 600,
  color: PRIMARY_COLOR,
  [TABLET_MEDIA]: {
    fontSize: 8,
  },
};

export const registerButtonStyle = {
  display: "block",
  marginTop: 3.12,
  padding: "14px 26px",
  textAlign: "center",
  fontSize: 15,

  [MOBILE_MEDIA]: {
    fontSize: 11,
  },
};

export const linkStyle = {
  display: "block",
  marginTop: 1.6,
  fontWeight: 600,
  fontSize: 11,
  textAlign: "center",
  color: InputColors.TEXT,

  [MOBILE_MEDIA]: {
    fontSize: 8,
  },
};
