import React, { useState } from "react";
import { Header } from "../../../widgets/Header";
import { AboutUsItem } from "../../../features/AboutUsItem/ui/AboutUsItem";
import JamalImage from "../../../shared/developers-bio/Jamal/JamalImage.jpg";
import RashidImage from "../../../shared/developers-bio/Rashid/man.png";
import RomanImage from "../../../shared/developers-bio/Roman/man.png";
import { RashidBio, RomanBio, JamalBio } from "../../../shared/developers-bio/";
import { Box, Typography } from "@mui/material";
import { AboutTeamContainer, rootStyle, titleStyle } from "./style";
import { CustomButton } from "../../../shared/ui/CustomButton";

const Links = {
  Jamal: "https://github.com/SkarabeyDM",
  Rashid: "https://github.com/roshik14",
  Roman: "https://github.com/duumbling",
};

export function AboutPage() {
  const [areItemsVIsible, setAreItemsVisible] = useState(false);
  return (
    <Box>
      <Header />
      <Box sx={{ ...rootStyle }}>
        {areItemsVIsible ? (
          <Box>
            <AboutUsItem
              bio={RashidBio}
              image={RashidImage}
              link={Links.Rashid}
            />
            <AboutUsItem bio={JamalBio} image={JamalImage} link={Links.Jamal} />
            <AboutUsItem bio={RomanBio} image={RomanImage} link={Links.Roman} />
          </Box>
        ) : (
          <Box {...AboutTeamContainer}>
            <Typography variant="h4" sx={{ ...titleStyle }}>
              О нас
            </Typography>
            <Typography variant="body1" component="p">
              тут есть много текста Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Praesent augue lectus, aliquet at dignissim
              rhoncus, rhoncus vel erat. Integer ac posuere mauris, ut tempor
              turpis. Fusce quis nisi pulvinar, congue nibh in, sagittis lorem.
              Suspendisse vel tellus non massa scelerisque feugiat eu vitae
              tellus. Maecenas tincidunt sit amet leo a malesuada. Curabitur ut
              ultrices erat, sed pretium purus. Mauris gravida sit amet orci et
              lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Mauris fermentum nisl eget interdum blandit. Aliquam viverra
              lacinia sem a accumsan. Nunc ut dolor sit amet libero posuere
              rhoncus et a magna. Sed in viverra ante, ut.тут есть много текста
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              augue lectus, aliquet at dignissim rhoncus, rhoncus vel erat.
              Integer ac posuere mauris, ut tempor turpis. Fusce quis nisi
              pulvinar, congue nibh in, sagittis lorem. Suspendisse vel tellus
              non massa scelerisque feugiat eu vitae tellus. Maecenas tincidunt
              sit amet leo a malesuada. Curabitur ut ultrices erat, sed pretium
              purus. Mauris gravida sit amet orci et lobortis. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Mauris fermentum nisl eget
              interdum blandit. Aliquam viverra lacinia sem a accumsan. Nunc ut
              dolor sit amet libero posuere rhoncus et a magna. Sed in viverra
              ante, ut.
            </Typography>
          </Box>
        )}
        <CustomButton
          onClick={() => {
            setAreItemsVisible(!areItemsVIsible);
          }}
        >
          {areItemsVIsible ? "О команде" : "Мы"}
        </CustomButton>
      </Box>
    </Box>
  );
}
