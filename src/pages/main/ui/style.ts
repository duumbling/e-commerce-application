import {
  type TypographyProps,
  type BoxProps,
  type StackProps,
} from "@mui/material";
import { backgroundIcon } from "../../../shared/lib/helpers/styles";
import { mainBackgroundImageUrl } from "../../../shared/assets/images";
import { ThemeColors } from "../../../shared/constants/colors";
import { type LinkProps } from "../../../shared/ui/Link";

export const bannerContainerStyleProps: BoxProps = {
  bgcolor: ThemeColors.BLACK,
  width: "100%",
  overflow: "hidden",
  sx: (theme) => ({
    ":hover": {
      color: theme.palette.primary.main,
    },
  }),
};

export const titleContainerStyleProps: BoxProps = {
  width: "100%",
  sx: {
    position: "relative",
    ":after": {
      ...backgroundIcon(mainBackgroundImageUrl),
      content: '""',
      backgroundSize: "cover",
      position: "absolute",
      inset: "0",
      opacity: "0.7",
    },
  },
};

export const bannerTextStyleProps = {
  color: "primary",
  fontSize: "8rem",
  fontWeight: "bold",
};

export const titleStackItemStyleProps: BoxProps["sx"] = {
  width: "fit-content",
  ":nth-child(2)": {
    alignSelf: "flex-end",
  },
};

export const titleStackStyleProps: StackProps = {
  width: "min(70vh, 100%)",
  flexDirection: "column",
  justifyContent: "center",
  m: "0 auto",
  sx: {
    "> *": titleStackItemStyleProps,
  },
};

export const titleTextStyleProps: TypographyProps = {
  ...bannerTextStyleProps,
  zIndex: 1,
  whiteSpace: "pre-wrap",
  position: "relative",
  align: "center",
};

export const bannerStyleProps: LinkProps = {
  ...bannerTextStyleProps,
  fontSize: "4rem",
  align: "center",
  color: ThemeColors.LIGHT,
};

export const bannerButtonStyleProps: BoxProps = {
  paddingY: "1rem",
};
