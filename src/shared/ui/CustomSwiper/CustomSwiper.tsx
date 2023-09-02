import React, { useRef, useState } from "react";
import { Box, IconButton, type BoxProps } from "@mui/material";
import { ThemeColors } from "../../constants/colors";
import type SwiperCore from "swiper";
import {
  Swiper,
  SwiperSlide,
  type SwiperProps,
  type SwiperSlideProps,
} from "swiper/react";
import {
  Navigation,
  EffectFade,
  Pagination,
  Thumbs,
  FreeMode,
} from "swiper/modules";
import { swiperSizeProps, swiperArrowStyle } from "./style";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import "./swiper-styles.css";

export type CustomSwiperProps = BoxProps & {
  imageUrls: string[];
  swiperProps?: SwiperProps;
  swiperSlideProps?: SwiperSlideProps;
  withPagination?: boolean;
  withNavigation?: boolean;
};

export function CustomSwiper({
  imageUrls,
  swiperProps,
  swiperSlideProps,
  withPagination,
  withNavigation,
  ...otherProps
}: CustomSwiperProps) {
  const leftArrowElement = useRef<HTMLElement | null>(null);
  const rightArrowElement = useRef<HTMLElement | null>(null);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  const modules = [
    Navigation,
    EffectFade,
    Thumbs,
    FreeMode,
    ...(swiperProps?.modules ?? []),
  ];

  if (withPagination ?? false) {
    modules.push(Pagination);
  }

  return (
    <Box {...swiperSizeProps} {...otherProps} position="relative">
      <Box sx={swiperArrowStyle} left={5} ref={leftArrowElement}>
        <IconButton color={ThemeColors.PRIMARY}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>
      <Box sx={swiperArrowStyle} right={5} ref={rightArrowElement}>
        <IconButton color={ThemeColors.PRIMARY}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Swiper
        modules={modules}
        pagination={withPagination ?? false ? { clickable: true } : undefined}
        navigation={
          withNavigation ?? false
            ? {
                prevEl: leftArrowElement?.current,
                nextEl: rightArrowElement?.current,
                enabled: true,
              }
            : undefined
        }
        thumbs={{
          swiper:
            thumbsSwiper !== null && !thumbsSwiper.destroyed
              ? thumbsSwiper
              : null,
        }}
        slidesPerView={1}
        loop
        centeredSlides
        effect="fade"
        {...swiperProps}
      >
        {imageUrls.map((value) => (
          <SwiperSlide
            key={value}
            style={{ cursor: "pointer" }}
            {...swiperSlideProps}
          >
            <Box
              component="img"
              src={value}
              alt="product image"
              {...swiperSizeProps}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs-swiper"
      >
        {imageUrls.map((value) => (
          <SwiperSlide key={value} style={{ cursor: "pointer" }}>
            <Box component="img" src={value} alt="product image" width="100%" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
