import { inputBaseClasses } from "@mui/material";
import { PRIMARY_COLOR } from "../../../shared/constants/colors";
import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";

export const rootStyle = {
  borderRadius: 2,
  fontSize: 20,
  width: 298,
  ":focus": {
    color: PRIMARY_COLOR,
  },
  [`&.${inputBaseClasses.root} fieldset`]: {
    borderColor: PRIMARY_COLOR,
  },

  [TABLET_MEDIA]: {
    fontSize: 15,
    width: 230,
  },

  [MOBILE_MEDIA]: {
    width: 210,
  },
};

export const selectItemStyle = {
  fontSize: 20,

  [TABLET_MEDIA]: {
    fontSize: 15,
  },
};
