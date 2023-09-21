import { type TypographyProps } from "@mui/material";
import { ThemeColors } from "../../constants/colors";
import { TABLET_MEDIA, MOBILE_MEDIA } from "../../constants/mediaQuery";

export const priceStyle: TypographyProps = {
  noWrap: true,
  fontWeight: "bold",
  sx: {
    fontSize: 30,

    [TABLET_MEDIA]: {
      fontSize: 25,
    },

    [MOBILE_MEDIA]: {
      fontSize: 20,
    },
  },
};

export const discountStyle: TypographyProps = {
  variant: "overline",
  color: ThemeColors.GREY_LIGHT,
  sx: (theme) => ({
    textDecoration: "line-through",
    textDecorationColor: theme.palette.primary.main,
    fontSize: 25,

    [TABLET_MEDIA]: {
      fontSize: 20,
    },

    [MOBILE_MEDIA]: {
      fontSize: 15,
    },
  }),
};
