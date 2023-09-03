import React, { useRef, useState } from "react";
import {
  Box,
  IconButton,
  type BoxProps,
  type SvgIconProps,
} from "@mui/material";
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
  imageProps?: BoxProps;
  slideProps?: SwiperSlideProps;
  navigationArrowStyle?: SvgIconProps;
  thumbsSwiperProps?: BoxProps &
    Pick<CustomSwiperProps, "swiperProps" | "slideProps" | "imageProps">;
  withNavigation?: boolean;
  withThumbs?: boolean;
};

export function CustomSwiper({
  imageUrls,
  swiperProps,
  imageProps,
  slideProps,
  thumbsSwiperProps,
  withNavigation,
  withThumbs,
  navigationArrowStyle,
  width,
  ...otherProps
}: CustomSwiperProps) {
  const leftArrowElement = useRef<HTMLElement | null>(null);
  const rightArrowElement = useRef<HTMLElement | null>(null);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  const modules = [
    Navigation,
    Pagination,
    EffectFade,
    Thumbs,
    FreeMode,
    ...(swiperProps?.modules ?? []),
  ];

  return (
    <>
      <Box
        {...otherProps}
        width={width ?? swiperSizeProps.width}
        position="relative"
      >
        {withNavigation !== undefined && (
          <>
            <Box sx={swiperArrowStyle} left={5} ref={leftArrowElement}>
              <IconButton color={ThemeColors.PRIMARY}>
                <ArrowBackIosNewIcon
                  fontSize="large"
                  {...navigationArrowStyle}
                />
              </IconButton>
            </Box>
            <Box sx={swiperArrowStyle} right={5} ref={rightArrowElement}>
              <IconButton color={ThemeColors.PRIMARY}>
                <ArrowForwardIosIcon
                  fontSize="large"
                  {...navigationArrowStyle}
                />
              </IconButton>
            </Box>
          </>
        )}

        <Swiper
          modules={modules}
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
          centeredSlides
          effect="fade"
          {...swiperProps}
        >
          {imageUrls.map((value) => (
            <SwiperSlide key={value} {...slideProps}>
              <Box
                component="img"
                src={value}
                alt="product image"
                {...imageProps}
                width={imageProps?.width ?? swiperSizeProps.width}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {withThumbs !== undefined && (
        <Box {...swiperSizeProps} {...thumbsSwiperProps}>
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbs-swiper"
            {...thumbsSwiperProps?.swiperProps}
          >
            {imageUrls.map((value) => (
              <SwiperSlide
                key={value}
                style={{ cursor: "pointer" }}
                {...thumbsSwiperProps?.slideProps}
              >
                <Box
                  component="img"
                  src={value}
                  alt="product image"
                  width="100%"
                  {...thumbsSwiperProps?.imageProps}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </>
  );
}
