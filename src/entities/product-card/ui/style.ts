import {
  InputColors,
  ProductCardColors,
} from "../../../shared/constants/colors";

export const rootStyle = {
  maxWidth: 280,
  lineHeight: "19px",
  boxShadow: "none",
};

export const contentStyle = {
  marginTop: 2,
  maxWidth: 254,
};

export const titleStyle = {
  fontSize: 24,
  fontWeight: 800,
  color: ProductCardColors.TITLE,
  textAlign: "center",
  lineHeight: "28px",
};

export const descriptionStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: InputColors.LABEL_SHRINK,
  marginTop: 3,
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
};
