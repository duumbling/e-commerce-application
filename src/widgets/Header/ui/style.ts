import { ButtonColors } from "../../../shared/constants/colors";
import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";

export const rootStyle = {
  backgroundColor: ButtonColors.CONTAINED_BUTTON_COLOR,
  boxShadow: "0 0.1px black",
  fontSize: 16,
  fontWeight: 700,

  [TABLET_MEDIA]: {
    fontSize: 12,
  },
};

export const navigationContainerStyle = {
  marginRight: "13vw",

  [TABLET_MEDIA]: {
    marginRight: "0",
  },
  [MOBILE_MEDIA]: {
    display: "none",
  },
};

export const authContainerStyle = {
  [MOBILE_MEDIA]: {
    display: "none",
  },
};

export const burgerMenuButtonStyle = {
  mr: 2,
  position: "absolute",
  right: "0",
  display: "none",
  [MOBILE_MEDIA]: {
    display: "block",
  },
};
