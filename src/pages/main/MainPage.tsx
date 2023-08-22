import React from "react";
import { Header } from "../../shared/ui/Header";
import { Grid, Stack } from "@mui/material";
import { Link } from "../../shared/ui/Link";
import { Paths } from "../../shared/constants/paths";
import { TABLET_MEDIA } from "../../shared/constants/mediaQuery";
import { customerTokenCache } from "../../shared/api";
import { CustomButton } from "../../shared/ui/CustomButton";
import { useNavigate } from "react-router-dom";

const linkStyle = {
  fontSize: 24,

  [TABLET_MEDIA]: {
    fontSize: 16,
  },
};

export function MainPage() {
  const isUserAuthenticated = customerTokenCache.get().token !== "";

  const navigate = useNavigate();

  const handleLogout = () => {
    customerTokenCache.set({
      token: "",
      expirationTime: 0,
    });
    navigate(Paths.Main);
  };

  return (
    <div>
      <Header>Главная страница</Header>
      <Grid container justifyContent="center" textAlign="center" marginTop={20}>
        <Grid item>
          {!isUserAuthenticated ? (
            <Stack spacing={3}>
              <Link href={Paths.Login} underline="always" sx={linkStyle}>
                Войти
              </Link>
              <Link href={Paths.Register} underline="always" sx={linkStyle}>
                Зарегистрироваться
              </Link>
            </Stack>
          ) : (
            <CustomButton sx={linkStyle} onClick={handleLogout}>
              Выйти
            </CustomButton>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
