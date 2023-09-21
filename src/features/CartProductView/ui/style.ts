import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";

export const containerStyle = {
  position: "relative",
  paddingRight: "3rem",
};

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
};

export const counterStyle = {
  fontSize: 40,
  fontWeight: 700,

  [TABLET_MEDIA]: {
    fontSize: 30,
  },

  [MOBILE_MEDIA]: {
    fontSize: 20,
  },
};

export const attributeStyle = {
  fontSize: 25,

  [MOBILE_MEDIA]: {
    fontSize: 20,
  },
};
