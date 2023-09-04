import {
  PRIMARY_COLOR,
  FORMS_HEADER_BORDER_COLOR,
} from "../../../shared/constants/colors";
import { MOBILE_MEDIA } from "../../../shared/constants/mediaQuery";
import { CONTAINED_BUTTON_PADDINGS } from "../../../shared/constants/sizes";
import GirlImage from "../../../shared/assets/images/girl_1240.png";

export const backgroundImageStyle = {
  height: {
    xs: "50vh",
    sm: "60vh",
    md: "80vh ",
  },
  backgroundImage: `url("${GirlImage}")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 100%",
  backgroundSize: {
    xs: "200px 300px",
    sm: "300px 400px",
    md: "450px 600px",
  },
};
export const gridContainerProps = {
  container: true,
  rowSpacing: { xs: "20%", sm: "10%", md: "10%" },
  columns: 4,
  justifyContent: "center",
  sx: {
    textAlign: "center",
  },
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
  padding: CONTAINED_BUTTON_PADDINGS,
  textAlign: "center",
  fontSize: 15,
  textTransform: "none",
  [MOBILE_MEDIA]: {
    fontSize: 11,
  },
};
