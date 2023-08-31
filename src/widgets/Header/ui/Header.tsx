import React, { useState } from "react";
import { IconButton, Toolbar, AppBar, Grid } from "@mui/material";
import { navigationItems } from "../model/items";
import { HeaderDrawer } from "./HeaderDrawer/HeaderDrawer";
import { Link } from "../../../shared/ui/Link";
import { customerTokenCache } from "../../../shared/api";
import { ThemeColors } from "../../../shared/constants/colors";
import { Paths } from "../../../shared/constants/paths";
import { Logo } from "../../../shared/ui/Logo";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  authContainerStyle,
  burgerMenuButtonStyle,
  navigationContainerStyle,
  rootStyle,
} from "./style";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setIsDrawerOpen((state) => !state);
  };

  const onAccountButtonClick = () => {
    navigate(Paths.Profile);
  };

  const isUserAuthenticated = customerTokenCache.get().token !== "";

  return (
    <header>
      <AppBar component="nav" sx={rootStyle} position="absolute">
        <Toolbar>
          <Logo />
          <Grid
            container
            columnSpacing={{ md: 3, sm: 1 }}
            justifyContent={{ md: "end", sm: "center" }}
            marginRight="13vw"
            sx={navigationContainerStyle}
          >
            {navigationItems.map((item) => (
              <Grid item key={item.value}>
                <Link href={item.href}>{item.value.toUpperCase()}</Link>
              </Grid>
            ))}
          </Grid>
          <Grid
            columnSpacing={3}
            item
            container
            justifyContent="end"
            alignItems="center"
            sm={4}
            sx={authContainerStyle}
          >
            {isUserAuthenticated ? (
              <Grid item>
                <IconButton size="large" onClick={onAccountButtonClick}>
                  <AccountCircleIcon />
                </IconButton>
              </Grid>
            ) : (
              <Grid item>
                <Link href={Paths.Login} color={ThemeColors.PRIMARY}>
                  Войти
                </Link>
              </Grid>
            )}
            <Grid item>
              <IconButton size="large">
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
          <IconButton
            edge="end"
            onClick={handleDrawerToggle}
            sx={burgerMenuButtonStyle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <HeaderDrawer
          isOpen={isDrawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          isUserAuthenticated={isUserAuthenticated}
        />
      </nav>
    </header>
  );
}
