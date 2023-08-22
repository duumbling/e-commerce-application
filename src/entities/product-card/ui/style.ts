import {
  InputColors,
  ProductCardColors,
} from "../../../shared/constants/colors";
import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";

export const rootStyle = {
  maxWidth: 280,
  lineHeight: "19px",
  boxShadow: "none",
};

export const gridContentContainerProps = {
  container: true,
  justifyContent: { md: "center", sm: "center", xs: "auto" },
  alignItems: "end",
};

export const gridImageItemProps = {
  item: true,
  xs: 4,
  sm: 12,
  md: 12,
  maxWidth: {
    xs: 105,
    sm: 148,
    md: 200,
  },
  height: {
    xs: 90,
    sm: 100,
    md: 170,
  },
};

export const gridContentItemProps = {
  item: true,
  xs: 8,
  md: 12,
  sm: 12,
};

export const contentStyle = {
  marginTop: 1,
  justifyContent: "center",

  [MOBILE_MEDIA]: {
    maxWidth: 168,
    marginTop: 0,
    padding: 1,
  },
};

export const titleStyle = {
  fontSize: 24,
  fontWeight: 800,
  color: ProductCardColors.TITLE,
  textAlign: "center",
  lineHeight: "28px",

  [TABLET_MEDIA]: {
    fontSize: 18,
  },

  [MOBILE_MEDIA]: {
    fontSize: 10,
  },
};

export const descriptionStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: InputColors.LABEL_SHRINK,
  marginTop: 3,

  [TABLET_MEDIA]: {
    fontSize: 11,
  },

  [MOBILE_MEDIA]: {
    fontSize: 8,
    marginTop: 0.01,
  },
};

export const buttonContainer = {
  container: true,
  justifyContent: "space-between",
  alignItems: "center",
};

export const priceStyle = {
  color: InputColors.TEXT,
  fontSize: 22,
  fontWeight: 700,
};

export const buttonStyle = {
  paddingTop: 0.5,
  paddingBottom: 0.4,
  [TABLET_MEDIA]: {
    fontSize: 11,
  },

  [MOBILE_MEDIA]: {
    marginRight: 5,
  },
};
