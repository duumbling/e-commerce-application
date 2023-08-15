import React from "react";
import { Header } from "../../../shared/ui/Header";
import { Box, Grid, Typography } from "@mui/material";
import {
  gridContainerProps,
  gridItemProps,
  gridHeaderProps,
  goBackButtonStyle,
  firstLineStyle,
  secondLineStyle,
} from "./style";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Box>
        <Grid {...gridContainerProps}>
          <Grid {...gridHeaderProps}>
            <Header></Header>
          </Grid>
          <Grid {...gridItemProps}>
            <Typography variant="h1" component="p" {...firstLineStyle}>
              404
            </Typography>
            <Typography variant="h3" component="p" {...secondLineStyle}>
              Кажется, вы заблудились..
            </Typography>
            <Box>
              <CustomButton
                type="submit"
                sx={goBackButtonStyle}
                onClick={(): void => {
                  navigate(-1);
                }}
              >
                Назад
              </CustomButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
