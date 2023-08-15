import {
  FORMS_HEADER_BORDER_COLOR,
  PRIMARY_COLOR,
} from "../../../shared/constants/colors";

export const gridContainerProps = {
  container: true,
  rowSpacing: { xs: "20%", sm: "15%", md: "10%" },
  columns: 4,
  justifyContent: "center",
};
export const gridItemProps = {
  item: true,
  xs: 4,
  sm: 4,
  md: 4,
};
export const gridHeaderProps = {
  item: true,
  xs: 4,
  sm: 4,
  md: 4,
  padding: "0 3% 0",
  borderBottom: `0.01rem solid ${FORMS_HEADER_BORDER_COLOR}`,
  color: PRIMARY_COLOR,
  fontSize: {
    xs: 22,
    sm: 30,
    md: 32,
  },
  fontWeight: "bold",
};
