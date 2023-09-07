import React, { useState } from "react";
import { IconButton, Toolbar, AppBar, Grid } from "@mui/material";
import { navigationItems } from "../model/items";
import { HeaderDrawer } from "./HeaderDrawer/HeaderDrawer";
import { Link } from "../../../shared/ui/Link";
import { isUserAuthenticated } from "../../../shared/api";
import { ThemeColors } from "../../../shared/constants/colors";
import { Paths } from "../../../shared/constants/paths";
import { Logo } from "../../../shared/ui/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import {
  authContainerStyle,
  burgerMenuButtonStyle,
  navigationContainerStyle,
  rootStyle,
} from "./style";
import { HeaderProfileMenu } from "./HeaderDrawer/ProfileMenu";
import { HeaderCartButton } from "./HeaderCartButton/HeaderCartButton";

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isAuthenticated = isUserAuthenticated();

  const handleDrawerToggle = (): void => {
    setIsDrawerOpen((state) => !state);
  };

  return (
    <header>
      <AppBar component="nav" sx={rootStyle} position="static">
        <Toolbar>
          <Logo />

          <Grid
            container
            columnSpacing={{ md: 3, sm: 1 }}
            justifyContent={{ md: "end", sm: "center" }}
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
            {isAuthenticated ? (
              <Grid item>
                <HeaderProfileMenu
                  onHeaderClose={() => {
                    setIsDrawerOpen(false);
                  }}
                />
              </Grid>
            ) : (
              <Grid item>
                <Link href={Paths.Login} color={ThemeColors.PRIMARY}>
                  Войти
                </Link>
              </Grid>
            )}
            <Grid item>
              <HeaderCartButton />
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
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          isUserAuthenticated={isAuthenticated}
        />
      </nav>
    </header>
  );
}
