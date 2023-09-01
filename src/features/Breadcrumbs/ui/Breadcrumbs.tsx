import React from "react";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { breadcrumbs } from "../model/model";
import { Link } from "../../../shared/ui/Link";

export function Breadcrumbs() {
  const breadcrumbsData = useBreadcrumbs(breadcrumbs);

  return (
    <MuiBreadcrumbs>
      {breadcrumbsData.map((value) => (
        <Link key={value.key} href={value.match.pathname}>
          {value.breadcrumb}
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
}
