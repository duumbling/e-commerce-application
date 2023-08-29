import { PRIMARY_COLOR, ButtonColors } from "../../constants/colors";

export const style = {
  contained: {
    backgroundColor: PRIMARY_COLOR,
    color: ButtonColors.CONTAINED_BUTTON_COLOR,
    fontWeight: 800,
    borderRadius: 2,
    "&:hover": {
      backgroundColor: ButtonColors.CONTAINED_BUTTON_BG_HOVER,
    },
  },
  text: {
    color: ButtonColors.TEXT_BUTTON,
    fontWeight: 700,
  },
  outlined: {
    color: ButtonColors.OUTLINED_BUTTON,
    fontWeight: 700,
    borderColor: ButtonColors.OUTLINED_BUTTON_BORDER,
    borderWidth: 2,
    "&:hover": {
      borderColor: ButtonColors.OUTLINED_BUTTON,
    },
  },
} as const;
