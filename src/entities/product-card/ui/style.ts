import { PRIMARY_COLOR } from "../../../shared/constants/colors";
import { TABLET_MEDIA } from "../../../shared/constants/mediaQuery";

const DESKTOP_WIDTH = 318;
const TABLET_WIDTH = 269;

export const imageStyle = {
  maxWidth: DESKTOP_WIDTH,

  [TABLET_MEDIA]: {
    maxWidth: TABLET_WIDTH,
  },
};

export const rootStyle = {
  maxWidth: DESKTOP_WIDTH,
  boxShadow: "none",
  textAlign: "center",
};

export const titleStyle = {
  marginTop: 1,
  fontSize: 22,
  fontWeight: 400,
  textAlign: "left",

  [TABLET_MEDIA]: {
    fontSize: 18,
  },
};

export const priceStyle = {
  fontSize: 30,
  fontWeight: 600,

  [TABLET_MEDIA]: {
    fontSize: 25,
  },
};

export const priceWithDiscountStyle = {
  ...priceStyle,
  fontSize: 25,
  textDecoration: "line-through",
  textDecorationColor: PRIMARY_COLOR,

  [TABLET_MEDIA]: {
    fontSize: 20,
  },
};

export const cardActionsStyle = {
  width: DESKTOP_WIDTH,

  [TABLET_MEDIA]: {
    width: TABLET_WIDTH,
  },
};
