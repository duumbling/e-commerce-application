import React from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { avatarStyle, bioStyle, rootStyle } from "./style";

interface AboutUsItemProps {
  image: string;
  bio: string;
  link: string;
}

export function AboutUsItem({ image, bio, link }: AboutUsItemProps) {
  const words = bio.split(" ");
  const firstWord = words[0];
  const otherWords = words.slice(1).join(" ");

  return (
    <Box sx={rootStyle}>
      <Grid>
        <Avatar alt="Team member" src={image} sx={{ ...avatarStyle }} />
        <Box>
          <Typography variant="body1" sx={{ ...bioStyle }}>
            <a href={link}>{firstWord}</a> {otherWords}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
}
