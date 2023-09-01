import React, { useState } from "react";
import { FavoriteBorderRounded, FavoriteRounded } from "@mui/icons-material";
import { IconButton, type IconButtonProps } from "@mui/material";
import { favoriteButtonStyle, favoriteIconStyle } from "./style";

export type FavoriteButtonProps = IconButtonProps & {
  favorite?: boolean;
};

export function FavoriteButton({
  favorite = false,
  ...otherProps
}: FavoriteButtonProps) {
  const [isFavorite, setFavorite] = useState(favorite);
  const toggleFavorite = () => {
    setFavorite(!isFavorite);
  };

  return (
    <IconButton
      sx={favoriteButtonStyle}
      onClick={toggleFavorite}
      {...otherProps}
    >
      {isFavorite ? (
        <FavoriteBorderRounded sx={favoriteIconStyle} />
      ) : (
        <FavoriteRounded sx={favoriteIconStyle} />
      )}
    </IconButton>
  );
}
