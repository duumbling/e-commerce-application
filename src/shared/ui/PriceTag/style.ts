import { type TypographyProps } from "@mui/material";
import { ThemeColors } from "../../constants/colors";

export const priceStyle: TypographyProps = { noWrap: true, fontWeight: "bold" };

export const discountStyle: TypographyProps = {
  variant: "overline",
  color: ThemeColors.GREY_LIGHT,
  sx: (theme) => ({
    textDecoration: "line-through",
    textDecorationColor: theme.palette.primary.main,
  }),
};
