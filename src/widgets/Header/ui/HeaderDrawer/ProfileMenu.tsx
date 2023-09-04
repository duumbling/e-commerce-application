import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Paths } from "../../../../shared/constants/paths";
import { useLocation, useNavigate } from "react-router-dom";
import { resetCustomerTokenCache } from "../../../../shared/api/tokens/helpers";

interface HeaderProfileMenuProps {
  onHeaderClose: () => void;
}

export function HeaderProfileMenu({ onHeaderClose }: HeaderProfileMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isMenuOpen = anchorEl !== null;

  const navigate = useNavigate();

  const location = useLocation();

  const handleAccountButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    onHeaderClose();
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate(Paths.Profile);
  };

  const handleLogoutClick = () => {
    resetCustomerTokenCache();
    handleMenuClose();

    const isMainPage = location.pathname === Paths.Main;

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
        id="basic-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleProfileClick}>Профиль</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Выйти</MenuItem>
      </Menu>
    </>
  );
}
