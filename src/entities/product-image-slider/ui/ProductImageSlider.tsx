import React, { useState } from "react";
import {
  Dialog,
  type DialogProps,
  Grid,
  IconButton,
  useMediaQuery,
  Box,
  type BoxProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  CustomSwiper,
  type CustomSwiperProps,
} from "../../../shared/ui/CustomSwiper";
import { modalSwiperSizeStyle, iconButtonStyle, slideStyle } from "./style";

type SubCustomWiper = Omit<CustomSwiperProps, "images">;

export interface ImageSliderProps {
  imageUrls: string[];
  mainSwiperProps?: SubCustomWiper;
  modalSwiperProps?: SubCustomWiper;
  modalDialogProps?: DialogProps;
  containerProps: BoxProps;
}

export function ProductImageSlider({
  imageUrls,
  mainSwiperProps,
  modalDialogProps,
  modalSwiperProps,
  containerProps,
}: ImageSliderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMobileWidth = useMediaQuery("(pointer: none)");

  const handleSliderClick = () => {
    if (!isMobileWidth) {
      setIsModalOpen(true);
    }
  };

  const handleCloseButtonClick = () => {
    setIsModalOpen(false);
  };

  return (
    <Box {...containerProps}>
      <CustomSwiper
        images={imageUrls}
        swiperProps={{ onClick: handleSliderClick }}
        slideProps={{
          style: {
            cursor: isMobileWidth ? "default" : "pointer",
            ...slideStyle,
          },
        }}
        withNavigation
        {...mainSwiperProps}
      />
      <Dialog open={isModalOpen} {...modalDialogProps}>
        <IconButton onClick={handleCloseButtonClick} sx={iconButtonStyle}>
          <CloseIcon sx={{ fontSize: 60 }} />
        </IconButton>
        <Grid container justifyContent="center">
          <Grid item>
            <CustomSwiper
              images={imageUrls}
              swiperProps={{
                pagination: { clickable: true },
                effect: "slide",
              }}
              width={modalSwiperSizeStyle.width}
              imageProps={modalSwiperSizeStyle}
              thumbsSwiperProps={modalSwiperSizeStyle}
              withThumbs
              {...modalSwiperProps}
            />
          </Grid>
        </Grid>
      </Dialog>
    </Box>
  );
}
