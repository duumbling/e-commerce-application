import {
  CONTAINED_BUTTON_BG_COLOR,
  CONTAINED_BUTTON_BG_HOVER_COLOR,
  OUTLINED_BUTTON_BORDER_COLOR,
  OUTLINED_BUTTON_COLOR,
  TEXT_BUTTON_COLOR,
} from "../../constants/colors";

export const style = {
  contained: {
    backgroundColor: CONTAINED_BUTTON_BG_COLOR,
    fontWeight: 800,
    "&:hover": {
      backgroundColor: CONTAINED_BUTTON_BG_HOVER_COLOR,
    },
  },
  text: {
    color: TEXT_BUTTON_COLOR,
    fontWeight: 700,
  },
  outlined: {
    color: OUTLINED_BUTTON_COLOR,
    fontWeight: 700,
    borderColor: OUTLINED_BUTTON_BORDER_COLOR,
    borderWidth: 2,
    "&:hover": {
      borderColor: OUTLINED_BUTTON_COLOR,
    },
  },
} as const;
