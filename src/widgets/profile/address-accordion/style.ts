import { paginationItemClasses } from "@mui/material";
import {
  FORMS_HEADER_BORDER_COLOR,
  PAGINATION_FILLED_COLOR,
  PRIMARY_COLOR,
} from "../../../shared/constants/colors";

const classes = {
  paginationItem: `.${paginationItemClasses.root}`,
  paginationCurrentPage: `.${paginationItemClasses.selected}`,
  paginationDots: `.${paginationItemClasses.ellipsis}`,
};

export const gridContainerProps = {
  container: true,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
};

export const gridItemProps = {
  item: true,
  gap: 0.5,
  xs: false,
  sm: 8,
  md: 10,
};

export const paginationStyle = {
  [classes.paginationItem]: {
    backgroundColor: "none",
    borderWidth: 1,
    borderColor: FORMS_HEADER_BORDER_COLOR,
    borderStyle: "solid",
  },
  [classes.paginationCurrentPage]: {
    backgroundColor: PAGINATION_FILLED_COLOR,
  },
  [classes.paginationDots]: {
    border: "none",
  },
};

export const titleBoxStyle = {
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  gap: 2,
  marginBottom: {
    xs: 0,
    sm: 2,
    md: 5,
  },
};

export const titleStyle = {
  color: PRIMARY_COLOR,
  fontWeight: 800,
  textAlign: "left",
  marginBottom: 1,
};
