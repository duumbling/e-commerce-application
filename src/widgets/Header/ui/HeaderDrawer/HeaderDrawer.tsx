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
  type DrawerProps,
} from "@mui/material";
import { navigationItems } from "../../model/items";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { listItemTextStyle, rootStyle } from "./style";
import { Link } from "../../../../shared/ui/Link";
import { Logo } from "../../../../shared/ui/Logo";
import { ThemeColors } from "../../../../shared/constants/colors";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../../shared/constants/paths";

type HeaderDrawerProps = DrawerProps & {
  isUserAuthenticated: boolean;
  onClose: () => void;
};

export function HeaderDrawer({
  open,
  onClose,
  isUserAuthenticated,
}: HeaderDrawerProps) {
  const navigate = useNavigate();

  const handleLoginButtonCLick = () => {
    navigate(Paths.Login);
  };

  const handleAccountButtonClick = () => {
    navigate(Paths.Profile);
  };

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={open}
      onClose={onClose}
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
              <IconButton size="large" onClick={handleAccountButtonClick}>
                <AccountCircleIcon />
              </IconButton>
            ) : (
              <IconButton size="large" onClick={handleLoginButtonCLick}>
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

        <IconButton size="large" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
}
