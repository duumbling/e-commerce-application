import React from "react";
import { Header } from "../../../widgets/Header";
import { AboutUsItem } from "../../../features/AboutUsItem/ui/AboutUsItem";
import JamalImage from "../../../shared/assets/developers-bio/Jamal/JamalImage.jpg";
import RashidImage from "../../../shared/assets/developers-bio/Rashid/man.png";
import RomanImage from "../../../shared/assets/developers-bio/Roman/man.png";
import CourseImage from "../../../shared/assets/images/rs_school.svg";
import {
  RashidBio,
  RomanBio,
  JamalBio,
} from "../../../shared/assets/developers-bio";
import { Box, Grid } from "@mui/material";
import { rootStyle } from "./style";
import { Link } from "../../../shared/ui/Link";

const Links = {
  Jamal: "https://github.com/SkarabeyDM",
  Rashid: "https://github.com/roshik14",
  Roman: "https://github.com/duumbling",
};

export function AboutPage() {
  return (
    <>
      <Header />
      <Box sx={{ ...rootStyle }}>
        <AboutUsItem bio={RomanBio} image={RomanImage} link={Links.Roman} />
        <AboutUsItem bio={RashidBio} image={RashidImage} link={Links.Rashid} />
        <AboutUsItem bio={JamalBio} image={JamalImage} link={Links.Jamal} />
      </Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="https://rs.school/">
            <Box component="img" src={CourseImage} width={80} height={80} />
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
