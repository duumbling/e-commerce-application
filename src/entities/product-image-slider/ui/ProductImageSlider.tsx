import React, { useState } from "react";
import {
  Dialog,
  type DialogProps,
  Grid,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  CustomSwiper,
  type CustomSwiperProps,
} from "../../../shared/ui/CustomSwiper";
import { modalSwiperSizeStyle, iconButtonStyle } from "./style";

export interface ImageSliderProps {
  imageUrls: string[];
  mainSwiperProps?: CustomSwiperProps;
  modalSwiperProps?: CustomSwiperProps;
  modalDialogProps?: DialogProps;
}

export function ProductImageSlider({
  imageUrls,
  mainSwiperProps,
  modalDialogProps,
  modalSwiperProps,
}: ImageSliderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMobileWidth = useMediaQuery("(max-width: 600px)");

  const handleSliderClick = () => {
    if (!isMobileWidth) {
      setIsModalOpen(true);
    }
  };

  const handleCloseButtonClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CustomSwiper
        images={imageUrls}
        swiperProps={{ onClick: handleSliderClick }}
        slideProps={{
          style: {
            cursor: isMobileWidth ? "default" : "pointer",
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
    </>
  );
}
