import {
  type GridProps,
  type BoxProps,
  type StackProps,
  type SxProps,
  type Theme,
  type TypographyProps,
} from "@mui/material";
import { ThemeColors } from "../../shared/constants/colors";
import { type LinkProps } from "../../shared/ui/Link";

type SXCollection = Record<string, SxProps<Theme>>;

type OptionalLinkProps = Omit<LinkProps, "href">;

export const socialButtonStyle: SXCollection = {
  iconButton: { flex: "1 0" },
  textButton: { flex: "1 0 auto" },
};

export const socialLinkStyleProps = {
  container: { xs: 6 } satisfies GridProps,
  link: { color: ThemeColors.GREY } satisfies OptionalLinkProps,
};

export const footerContainerStyleProps: GridProps = {
  spacing: 2,
  alignContent: "space-around",
};

export const footerLogoContainerStyleProps: GridProps = {
  xs: 12,
  sm: 2,
  md: 1,
  lg: 12,
  justifyContent: "flex-start",
};

export const footerLinksContainerStyleProps: GridProps = {
  xs: 12,
  sm: 10,
  md: 11,
  lg: 5,
};

export const horizontalStackStyleProps: StackProps = {
  direction: "row",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  flexWrap: "wrap",
  gap: 1,
  useFlexGap: true,
};

export const footerLinksInfoContainerStyleProps: StackProps = {
  ...horizontalStackStyleProps,
  justifyContent: "space-around",
};

export const footerLinksSocialSubContainerStyleProps: GridProps = {
  spacing: 2,
  xs: 8,
  alignContent: "flex-start",
};

export const footerLinksSocialContainerStyleProps: GridProps = {
  my: 2,
};

export const footerLinksSocialAddressContainerStyleProps: GridProps = {
  xs: 4,
};
export const footerLinksSocialAddressSubContainerStyleProps: StackProps = {
  spacing: 2,
  useFlexGap: true,
};

export const footerContactsContainerStyleProps: GridProps = {
  xs: 12,
  lg: 6,
};

export const footerContactsSocialButtonsContainerStyleProps: StackProps = {
  direction: "row",
  flexWrap: "wrap",
  spacing: 2,
  useFlexGap: true,
};

export const footerContactsInfoContainerStyleProps: StackProps = {
  direction: "row",
  flexWrap: "wrap",
  justifyContent: "space-around",
  alignItems: "center",
};

export const footerContactsPaymentContainerStyleProps: StackProps = {
  direction: "row",
};

export const footerContactsTitleStyleProps: TypographyProps = {
  variant: "button",
  fontWeight: "bold",
};

export const footerContactsPhoneNumberStyleProps: OptionalLinkProps = {
  variant: "h4",
  fontWeight: "bold",
  color: ThemeColors.PRIMARY,
};

export const footerLinksSocialStyleProps: OptionalLinkProps = {
  fontWeight: "bold",
};

export const paymentIconStyleProps: BoxProps = {
  p: "2rem",
};
