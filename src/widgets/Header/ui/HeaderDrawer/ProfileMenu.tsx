import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Paths } from "../../../../shared/constants/paths";
import { useLocation, useNavigate } from "react-router-dom";
import { resetCustomerTokenCache } from "../../../../shared/api/tokens/helpers";
import { useAppDispatch } from "../../../../shared/model/hooks";
import { loadCartData } from "../../../../entities/cart";

interface HeaderProfileMenuProps {
  onHeaderClose: () => void;
}

export function HeaderProfileMenu({ onHeaderClose }: HeaderProfileMenuProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isMenuOpen = anchorElement !== null;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleAccountButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
    onHeaderClose();
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate(Paths.Profile);
  };

  const handleLogoutClick = () => {
    const isMainPage = location.pathname === Paths.Main;

    resetCustomerTokenCache();
    handleMenuClose();
    void dispatch(loadCartData());
    navigate(Paths.Main);

    if (isMainPage) {
      navigate(0);
    }
  };

  return (
    <>
      <IconButton size="large" onClick={handleAccountButtonClick}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfileClick}>Профиль</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Выйти</MenuItem>
      </Menu>
    </>
  );
}
