import React from "react";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "../../../shared/ui/Link";
import { ThemeColors } from "../../../shared/constants/colors";
import { MOBILE_MEDIA } from "../../../shared/constants/mediaQuery";
import { categoriesData } from "../../../entities/category";

export function Breadcrumbs() {
  const breadcrumbsData = useBreadcrumbs(categoriesData);

  return (
    <MuiBreadcrumbs>
      {breadcrumbsData.map((value) => (
        <Link
          key={value.key}
          href={value.match.pathname}
          color={ThemeColors.GREY}
          sx={{
            fontSize: 18,

            [MOBILE_MEDIA]: {
              fontSize: 13,
            },
          }}
        >
          {value.breadcrumb}
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
}
