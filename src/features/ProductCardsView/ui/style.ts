import { PRIMARY_COLOR } from "../../../shared/constants/colors";
import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";

const SMALL_DESKTOP_MEDIA = "@media (max-width: 1158px)";

export const rootStyle = {
  maxWidth: 1200,
  margin: "auto",

  [SMALL_DESKTOP_MEDIA]: {
    maxWidth: 900,
  },

  [TABLET_MEDIA]: {
    maxWidth: 650,
  },

  [MOBILE_MEDIA]: {
    maxWidth: 280,
  },
};

export const titleStyle = {
  color: PRIMARY_COLOR,
  fontSize: 32,
  fontWeight: 800,

  marginLeft: 4,

  [SMALL_DESKTOP_MEDIA]: {
    marginLeft: 3,
  },

  [TABLET_MEDIA]: {
    fontSize: 26,
  },

  [MOBILE_MEDIA]: {
    fontSize: 21,
    marginLeft: 0,
  },
};

export const productsContainerProps = {
  container: true,
  alignItems: "center",
  columnSpacing: { xs: 12, md: 12, sm: 6 },
  rowSpacing: { xs: 2, sm: 8, md: 10 },
  justifyContent: "center",
};
