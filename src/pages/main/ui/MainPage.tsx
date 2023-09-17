import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Header } from "../../../widgets/Header";
import {
  bannerStyleProps,
  bannerContainerStyleProps,
  titleContainerStyleProps,
  titleStackStyleProps,
  titleTextStyleProps,
  bannerButtonStyleProps,
  sectionTitleStyleProps,
  mainStackStyleProps,
} from "./style";
import { Link } from "../../../shared/ui/Link";
import { Paths } from "../../../shared/constants/paths";
import { DiscountCodeList } from "../../../widgets/DiscountCodeList";

export function MainPage() {
  return (
    <>
      <Header />
      <Stack component="main" {...mainStackStyleProps}>
        <Box {...bannerContainerStyleProps}>
          <Link href={Paths.Catalog} {...bannerStyleProps}>
            <Box {...titleContainerStyleProps}>
              <Typography variant={"h1"} {...titleTextStyleProps}>
                <Stack {...titleStackStyleProps}>
                  <Box>НОВАЯ</Box> <Box>ОБУВЬ</Box> <Box>НОВЫЙ</Box>{" "}
                  <Box>
                    ТЫ
                    {"_________"}
                  </Box>
                </Stack>
              </Typography>
            </Box>
            <Box {...bannerButtonStyleProps}>КАТАЛОГ</Box>
          </Link>
        </Box>

        <Box>
          <Divider>
            <Typography {...sectionTitleStyleProps}>Промо-коды</Typography>
          </Divider>
          <DiscountCodeList />
        </Box>
      </Stack>
    </>
  );
}
