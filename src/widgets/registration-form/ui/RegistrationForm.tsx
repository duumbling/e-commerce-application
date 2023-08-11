import React from "react";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Switch,
} from "@mui/material";
import {
  titleStyle,
  textFieldStyle,
  firstTextFieldStyle,
  registerButtonStyle,
  linkStyle,
  gridContainerProps,
  gridItemProps,
  addressBoxStyle,
  commonAddressSwitchLabelStyle,
  rootStyle,
} from "./style";
import { CustomTextField } from "../../../shared/ui/CustomTextField";
import { CustomButton } from "../../../shared/ui/CustomButton";

import { AddressForm } from "../../../features";
import { AboutForm } from "../../../features/AboutForm";
import { PasswordField } from "../../../shared/ui/PasswordField";

export const RegistrationForm = () => {
  return (
    <form id="registration-form">
      <Box sx={rootStyle}>
        <Grid {...gridContainerProps}>
          <Grid {...gridItemProps}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormLabel sx={{ display: "block", ...titleStyle }}>
                Аккаунт
              </FormLabel>
              <CustomTextField
                type="email"
                label="Email"
                sx={firstTextFieldStyle}
              />
              <PasswordField label="Пароль" sx={textFieldStyle} />
              <PasswordField label="Повторите пароль" sx={textFieldStyle} />
            </Box>
          </Grid>
          <Grid {...gridItemProps}>
            <AboutForm
              title="О себе"
              titleProps={{ sx: titleStyle }}
              firstNameFieldProps={{ sx: firstTextFieldStyle }}
              lastNameFieldProps={{ sx: textFieldStyle }}
              birthDateFieldProps={{ sx: textFieldStyle }}
            />
          </Grid>
        </Grid>
        <Box sx={addressBoxStyle}>
          <Grid {...gridContainerProps}>
            <Grid {...gridItemProps}>
              <AddressForm
                title="Адрес доставки"
                titleProps={{ sx: titleStyle }}
                countryFieldProps={{ sx: firstTextFieldStyle }}
                cityFieldProps={{ sx: textFieldStyle }}
                streetFieldProps={{ sx: textFieldStyle }}
                indexFieldProps={{ sx: textFieldStyle }}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <AddressForm
                title="Адрес выставления счетов"
                titleProps={{ sx: titleStyle }}
                countryFieldProps={{ sx: firstTextFieldStyle }}
                cityFieldProps={{ sx: textFieldStyle }}
                streetFieldProps={{ sx: textFieldStyle }}
                indexFieldProps={{ sx: textFieldStyle }}
              />
            </Grid>
          </Grid>
        </Box>

        <Grid
          container
          columnSpacing={{ xs: 0, sm: 4, md: 10 }}
          justifyContent={{
            xs: "center",
            md: "space-around",
          }}
        >
          <Grid item justifyContent="center">
            <FormControlLabel
              control={<Switch />}
              label="Указать общий адрес"
              sx={commonAddressSwitchLabelStyle}
            />
            <CustomButton
              type="submit"
              form="registration-form"
              sx={registerButtonStyle}
            >
              Зарегистрироваться
            </CustomButton>
            <Link href="#" variant="body2" color="inherit" sx={linkStyle}>
              Есть аккаунт? Войти
            </Link>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
