import { PRIMARY_COLOR } from "../../../shared/constants/colors";
import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";

export const rootStyle = {
  maxWidth: 1200,
  margin: "auto",

  "@media (max-width: 1158px)": {
    maxWidth: 900,
  },

  [TABLET_MEDIA]: {
    maxWidth: 650,
  },
};

export const titleStyle = {
  color: PRIMARY_COLOR,
  fontSize: 32,
  fontWeight: 800,

  marginLeft: 4,

  "@media (max-width: 1158px)": {
    marginLeft: 3,
  },

  [TABLET_MEDIA]: {
    fontSize: 26,
  },

  [MOBILE_MEDIA]: {
    fontSize: 21,
  },
};

export const productsContainerProps = {
  container: true,
  item: true,
  alignItems: "center",
  columnSpacing: 1,
  rowSpacing: { xs: 2, sm: 8, md: 10 },
  justifyContent: { md: "center", sm: "space-around", xs: "center" },
};
