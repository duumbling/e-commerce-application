import React, { useState } from "react";
import {
  IconButton,
  Toolbar,
  type BoxProps,
  AppBar,
  Grid,
} from "@mui/material";
import { Paths } from "../../shared/constants/paths";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from "../../shared/ui/Logo";
import { Link } from "../../shared/ui/Link";
import { MOBILE_MEDIA, TABLET_MEDIA } from "../../shared/constants/mediaQuery";
import { ThemeColors } from "../../shared/constants/colors";
import { customerTokenCache } from "../../shared/api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { navigationItems } from "./model/items";
import { HeaderDrawer } from "./Drawer/Drawer";

type HeaderProps = Pick<BoxProps, "children" | "sx">;

export function Header({ sx }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((state) => !state);
  };

  const isUserAuthenticated = customerTokenCache.get().token !== "";

  return (
    <React.Fragment>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 0.1px black",
          fontSize: 16,
          fontWeight: 700,

          [TABLET_MEDIA]: {
            fontSize: 12,
          },
        }}
      >
        <Toolbar>
          <Logo />
          <Grid
            container
            columnSpacing={{ md: 3, sm: 1 }}
            justifyContent={{ md: "end", sm: "center" }}
            marginRight="13vw"
            sx={{
              [TABLET_MEDIA]: {
                marginRight: "0",
              },
              [MOBILE_MEDIA]: {
                display: "none",
              },
            }}
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
            sx={{
              [MOBILE_MEDIA]: {
                display: "none",
              },
            }}
          >
            {isUserAuthenticated ? (
              <Grid item>
                <IconButton size="large" color="inherit">
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
              <IconButton size="large" color="inherit">
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              position: "absolute",
              right: "0",
            }}
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
    </React.Fragment>
  );
}
