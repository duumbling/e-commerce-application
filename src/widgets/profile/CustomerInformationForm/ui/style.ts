import { inputBaseClasses } from "@mui/material";
import { ThemeColors } from "../../../../shared/constants/colors";

const classes = {
  disabled: `.${inputBaseClasses.root}.${inputBaseClasses.disabled} input`,
};

export const rootStyle = {
  marginTop: "25px",
  textAlign: "left",
};

export const formStyle = {
  color: ThemeColors.GREY,
};

export const gridContainerProps = {
  container: true,
  columnSpacing: { xs: 12, sm: 2, md: 12 },
  rowSpacing: { xs: 4, sm: 6, md: 8 },
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
};

export const gridItemProps = {
  item: true,
  xs: false,
  sm: 5,
  md: 5,
};

export const formGridItemProps = {
  item: true,
  xs: false,
  sm: 10,
  md: 10,
  display: "flex",
  justifyContent: "center",
};

export const cardsGridItemProps = {
  item: true,
  gap: 0.5,
  xs: false,
  sm: 10,
  md: 8,
  padding: 0,
};

export const textFieldStyle = {
  marginBottom: 2.75,
  width: "255px",
};

export const dateFieldStyle = {
  [classes.disabled]: {
    color: "#bdbdbd !important",
    WebkitTextFillColor: "#bdbdbd !important",
  },
};
