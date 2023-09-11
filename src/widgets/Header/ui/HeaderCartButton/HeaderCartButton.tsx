import React from "react";
import { IconButton, Badge, type IconButtonProps } from "@mui/material";
import { ThemeColors } from "../../../../shared/constants/colors";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../../shared/constants/paths";
import { useAppSelector } from "../../../../shared/model/hooks";

export function HeaderCartButton({ onClick, ...buttonProps }: IconButtonProps) {
  const navigate = useNavigate();

  const { ids } = useAppSelector((state) => state.cartReducer);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    navigate(Paths.Cart);
    if (onClick !== undefined) {
      onClick(event);
    }
  };

  return (
    <IconButton size="large" {...buttonProps} onClick={handleClick}>
      <Badge badgeContent={ids.length} color={ThemeColors.PRIMARY}>
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
}
