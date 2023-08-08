import { ButtonColors, ERROR_COLOR, InputColors } from "../../constants/colors";
import {
  inputBaseClasses,
  inputLabelClasses,
  formHelperTextClasses,
} from "@mui/material";

const INPUT_BORDER_WIDTH = 1.5;
const INPUT_HOVER_BORDER_WIDTH = INPUT_BORDER_WIDTH + 0.5;

const classes = {
  root: `&.${inputBaseClasses.root} fieldset`,
  hover: `&.${inputBaseClasses.root}&:hover fieldset`,
  focus: `&.${inputBaseClasses.focused} fieldset`,
  error: `&.${inputBaseClasses.error} fieldset`,
  errorHover: `&:hover&.${inputBaseClasses.error} fieldset`,
  errorFocus: `&.${inputBaseClasses.focused}&.${inputBaseClasses.error} fieldset`,
  disabledFieldset: `&.${inputBaseClasses.disabled} fieldset`,
  disabledInput: `&.${inputBaseClasses.disabled} input`,
  labelShrink: `&.${inputLabelClasses.shrink}`,
  labelError: `&.${inputLabelClasses.root}&.${inputLabelClasses.error}`,
  helperText: `&.${formHelperTextClasses.error}`,
};

export const textFieldStyle = {
  color: InputColors.TEXT,
  fontSize: 15,
  fontWeight: 700,
  lineHeight: 28,
};

export const inputStyle = {
  [classes.root]: {
    borderWidth: INPUT_BORDER_WIDTH,
    borderRadius: 2,
  },
  [classes.hover]: {
    borderWidth: INPUT_HOVER_BORDER_WIDTH,
    borderColor: `${InputColors.BORDER_HOVER}`,
  },
  [classes.focus]: {
    border: `${INPUT_BORDER_WIDTH}px solid ${InputColors.BORDER_FOCUSED}!important`,
  },
  [classes.error]: {
    border: `${INPUT_BORDER_WIDTH}px solid ${ERROR_COLOR}!important`,
  },
  [classes.errorHover]: {
    border: `${INPUT_HOVER_BORDER_WIDTH}px solid ${ERROR_COLOR}!important`,
  },
  [classes.errorFocus]: {
    border: `${INPUT_BORDER_WIDTH}px solid ${ERROR_COLOR}!important`,
  },
  [classes.disabledFieldset]: {
    border: `${INPUT_BORDER_WIDTH}px solid ${ButtonColors.OUTLINED_BUTTON_BORDER} !important`,
  },
  [classes.disabledInput]: {
    color: `${InputColors.TEXT} !important`,
    "-webkit-text-fill-color": `${InputColors.TEXT} !important`,
  },
  [classes.helperText]: {
    color: ERROR_COLOR,
  },
};

export const labelStyle = {
  [classes.labelShrink]: {
    color: InputColors.LABEL_SHRINK,
  },
  [classes.labelError]: {
    color: ERROR_COLOR,
  },
};

export const helperTextStyle = {
  [classes.helperText]: {
    color: ERROR_COLOR,
  },
};
