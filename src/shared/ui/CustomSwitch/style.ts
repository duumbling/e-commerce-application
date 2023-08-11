import { PRIMARY_COLOR, DEFAULT_SWITCH_COLOR } from "../../constants/colors";

import {
  switchClasses,
  typographyClasses,
  buttonBaseClasses,
  touchRippleClasses,
  formControlLabelClasses,
} from "@mui/material";
import {
  BIG_SIZE_SWITCH,
  SMALL_SIZE_SWITCH,
  SWITCH_BORDER_WIDTH,
} from "../../constants/sizes";

const classes = {
  root: `.${switchClasses.root}`,
  touchRiple: `.${touchRippleClasses.root}`,
  checkedThumbPosition: `.${buttonBaseClasses.root}.${switchClasses.checked}`,
  defaultThumb: `.${switchClasses.root} .${switchClasses.thumb}`,
  checkedThumb: `.${switchClasses.checked} .${switchClasses.thumb}`,
  thumbHover: `.${buttonBaseClasses.root}.${switchClasses.switchBase}:hover`,
  thumbPosition: `.${buttonBaseClasses.root}`,
  defaultTrack: `.${switchClasses.root} .${switchClasses.track}`,
  checkedTrack: `.${buttonBaseClasses.root}.${switchClasses.checked}+.${switchClasses.track}`,
  label: `.${formControlLabelClasses.root} &.${typographyClasses.root}`,
  labelChecked: `.${formControlLabelClasses.root}:has(.${switchClasses.checked}) &.${typographyClasses.root}`,
};

export const bigSizeStyle = {
  [classes.touchRiple]: {
    display: "none",
  },
  [classes.root]: {
    width: BIG_SIZE_SWITCH.SWITCH_ROOT_WIDTH,
    height: BIG_SIZE_SWITCH.SWITCH_ROOT_HEIGHT,
  },
  [classes.thumbHover]: {
    backgroundColor: "transparent",
  },
  [classes.thumbPosition]: BIG_SIZE_SWITCH.SWITCH_POSITION_SETTINGS,
  [classes.checkedThumbPosition]: {
    transform: BIG_SIZE_SWITCH.SWITCH_THUMB_TRANSLATE,
  },
  [classes.defaultThumb]: {
    boxShadow: "none",
    color: DEFAULT_SWITCH_COLOR,
    width: BIG_SIZE_SWITCH.SWITCH_THUMB_SIZE,
    height: BIG_SIZE_SWITCH.SWITCH_THUMB_SIZE,
  },
  [classes.checkedThumb]: {
    color: `${PRIMARY_COLOR}`,
  },
  [classes.defaultTrack]: {
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: SWITCH_BORDER_WIDTH,
    borderColor: DEFAULT_SWITCH_COLOR,
    backgroundColor: "initial",
  },
  [classes.checkedTrack]: {
    borderStyle: "solid",
    borderWidth: SWITCH_BORDER_WIDTH,
    borderColor: PRIMARY_COLOR,
    backgroundColor: "initial",
  },
  [classes.label]: {
    marginTop: BIG_SIZE_SWITCH.SWITCH_LABEL_MARGIN_TOP,
    color: DEFAULT_SWITCH_COLOR,
    fontSize: BIG_SIZE_SWITCH.SWITCH_LABEL_FONT_SIZE,
  },
  [classes.labelChecked]: {
    color: PRIMARY_COLOR,
  },
};

export const smallSizeStyle = {
  [classes.touchRiple]: {
    display: "none",
  },
  [classes.thumbHover]: {
    backgroundColor: "transparent",
  },
  [classes.root]: {
    width: SMALL_SIZE_SWITCH.SWITCH_ROOT_WIDTH,
    height: SMALL_SIZE_SWITCH.SWITCH_ROOT_HEIGHT,
  },
  [classes.thumbPosition]: SMALL_SIZE_SWITCH.SWITCH_POSITION_SETTINGS,
  [classes.checkedThumbPosition]: {
    transform: SMALL_SIZE_SWITCH.SWITCH_THUMB_TRANSLATE,
  },
  [classes.defaultThumb]: {
    boxShadow: "none",
    color: DEFAULT_SWITCH_COLOR,
    width: SMALL_SIZE_SWITCH.SWITCH_THUMB_SIZE,
    height: SMALL_SIZE_SWITCH.SWITCH_THUMB_SIZE,
  },
  [classes.checkedThumb]: {
    color: PRIMARY_COLOR,
  },
  [classes.defaultTrack]: {
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: SWITCH_BORDER_WIDTH,
    borderColor: DEFAULT_SWITCH_COLOR,
    backgroundColor: "transparent",
  },
  [classes.checkedTrack]: {
    borderStyle: "solid",
    borderWidth: SWITCH_BORDER_WIDTH,
    borderColor: PRIMARY_COLOR,
    backgroundColor: "#fff",
  },
  [classes.label]: {
    marginTop: SMALL_SIZE_SWITCH.SWITCH_LABEL_MARGIN_TOP,
    color: DEFAULT_SWITCH_COLOR,
    fontSize: SMALL_SIZE_SWITCH.SWITCH_LABEL_FONT_SIZE,
  },
  [classes.labelChecked]: {
    color: PRIMARY_COLOR,
  },
};
