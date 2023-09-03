import { PRIMARY_COLOR } from "../../constants/colors";

export const swiperArrowStyle = {
  position: "absolute",
  display: "flex",
  top: "40%",
  cursor: "pointer",
  zIndex: 10,
  borderRadius: "50%",

  ":hover": {
    boxShadow: "0 0 5px black",
    backgroundCOlor: PRIMARY_COLOR,
  },
};

export const swiperSizeProps = {
  width: {
    md: 520,
    sm: 452,
    xs: "90vw",
  },
};
