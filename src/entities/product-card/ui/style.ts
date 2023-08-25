import { PRIMARY_COLOR } from "../../../shared/constants/colors";
import { TABLET_MEDIA } from "../../../shared/constants/mediaQuery";

export const imageStyle = {
  maxWidth: 318,
  maxHeight: 285,

  [TABLET_MEDIA]: {
    maxWidth: 269,
    maxHeight: 241,
  },
};

export const rootStyle = {
  maxWidth: 318,
  boxShadow: "none",
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
