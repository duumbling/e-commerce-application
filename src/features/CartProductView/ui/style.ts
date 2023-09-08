import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";

export const titleStyle = {
  fontSize: 25,
  fontWeight: 700,

  [TABLET_MEDIA]: {
    fontSize: 19,
  },

  [MOBILE_MEDIA]: {
    fontSIze: 12,
  },
};

export const deleteIconButtonStyle = {
  position: "absolute",
  right: 0,
  top: 0,

  "@media (max-width: 650px)": {
    top: "auto",
    bottom: 0,
  },
};

export const itemCounterStyle = {
  fontSize: 40,
  fontWeight: 700,

  [TABLET_MEDIA]: {
    fontSize: 30,
  },

  [MOBILE_MEDIA]: {
    fontSize: 20,
  },
};

export const itemAttributeStyle = {
  fontSize: 25,

  [MOBILE_MEDIA]: {
    fontSize: 20,
  },
};
