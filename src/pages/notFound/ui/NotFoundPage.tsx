import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  gridContainerProps,
  gridItemProps,
  goBackButtonStyle,
  firstLineStyle,
  secondLineStyle,
} from "./style";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../widgets/Header";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <Box marginTop="10%">
        <Grid {...gridContainerProps}>
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
