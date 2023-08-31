import React from "react";
import {
  Drawer,
  Box,
  Grid,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ThemeColors } from "../../../shared/constants/colors";
import { Logo } from "../../../shared/ui/Logo";
import { navigationItems } from "../model/items";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "../../../shared/ui/Link";
import { listItemTextStyle, rootStyle } from "./style";

interface HeaderDrawerProps {
  isOpen: boolean;
  handleDrawerToggle: () => void;
  isUserAuthenticated: boolean;
}

export function HeaderDrawer({
  isOpen,
  handleDrawerToggle,
  isUserAuthenticated,
}: HeaderDrawerProps) {
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={rootStyle}
    >
      <Box sx={{ textAlign: "center" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Logo />
          </Grid>
          <Grid item>
            {isUserAuthenticated ? (
              <IconButton size="large">
                <AccountCircleIcon />
              </IconButton>
            ) : (
              <IconButton size="large">
                <LoginIcon />
              </IconButton>
            )}

            <IconButton size="large">
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Divider />

        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.href} sx={{ justifyContent: "center" }}>
              <Link href={item.href} color={ThemeColors.BLACK}>
                <ListItemText primary={item.value} sx={listItemTextStyle} />
              </Link>
            </ListItem>
          ))}
        </List>

        <IconButton size="large" color="inherit" onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
}
