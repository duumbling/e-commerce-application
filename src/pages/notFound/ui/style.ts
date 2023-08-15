import {
  PRIMARY_COLOR,
  FORMS_HEADER_BORDER_COLOR,
} from "../../../shared/constants/colors";
import { MOBILE_MEDIA } from "../../../shared/constants/mediaQuery";

export const gridContainerProps = {
  container: true,
  rowSpacing: { xs: "20%", sm: "5%", md: "5%" },
  columns: 4,
  justifyContent: "center",
};
export const gridItemProps = {
  item: true,
  xs: 4,
  sm: 4,
  md: 4,
  color: PRIMARY_COLOR,
};
export const gridHeaderProps = {
  item: true,
  xs: 4,
  sm: 4,
  md: 4,
  padding: "0 3% 0",
  borderBottom: `0.01rem solid ${FORMS_HEADER_BORDER_COLOR}`,
  fontSize: {
    xs: 22,
    sm: 30,
    md: 32,
  },
  fontWeight: "bold",
};
export const firstLineStyle = {
  marginBottom: 2,
  fontSize: { xs: 48, sm: 70, md: 87 },
};
export const secondLineStyle = {
  fontSize: { xs: 25, sm: 45, md: 60 },
};
export const goBackButtonStyle = {
  marginTop: { xs: 5, sm: 10, md: 10 },
  padding: "14px 86px",
  textAlign: "center",
  fontSize: 15,
  textTransform: "none",
  [MOBILE_MEDIA]: {
    fontSize: 11,
    padding: "10px 43px",
  },
  color: "#fff",
};
