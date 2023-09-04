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
import { listItemTextStyle, rootStyle } from "./style";
import { Link } from "../../../../shared/ui/Link";
import { Logo } from "../../../../shared/ui/Logo";
import { ThemeColors } from "../../../../shared/constants/colors";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../../shared/constants/paths";
import { HeaderProfileMenu } from "./ProfileMenu";

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
    onClose();
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
              <HeaderProfileMenu onHeaderClose={onClose} />
            ) : (
              <IconButton size="large" onClick={handleLoginButtonCLick}>
                <LoginIcon />
              </IconButton>
            )}

            <IconButton size="large" onClick={onClose}>
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Divider />

        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.href} sx={{ justifyContent: "center" }}>
              <Link
                href={item.href}
                color={ThemeColors.BLACK}
                onClick={onClose}
              >
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
