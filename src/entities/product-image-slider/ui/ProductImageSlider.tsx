import React, { useState } from "react";

import { Dialog, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { CustomSwiper } from "../../../shared/ui/CustomSwiper";

export interface ImageSliderProps {
  imageUrls: string[];
}

export function ProductImageSlider({ imageUrls }: ImageSliderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSliderClick = () => {
    setIsModalOpen(true);
  };

  const onFullscreenClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CustomSwiper
        images={imageUrls}
        swiperProps={{ onClick: onSliderClick }}
        slideProps={{
          style: {
            cursor: "pointer",
          },
        }}
        withNavigation
        withThumbs
      />
      <Dialog open={isModalOpen}>
        <IconButton
          onClick={onFullscreenClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 100,
          }}
        >
          <CloseIcon sx={{ fontSize: 60 }} />
        </IconButton>
        <CustomSwiper
          images={imageUrls}
          swiperProps={{
            pagination: { clickable: true },
            effect: "slide",
          }}
        />
      </Dialog>
    </>
  );
}
