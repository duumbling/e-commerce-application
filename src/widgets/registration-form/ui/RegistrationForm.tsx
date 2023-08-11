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
  commonAddressSwitchLabelStyle,
  rootStyle,
  buttonBoxStyle,
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
          <Grid item sm={6} md={6} sx={buttonBoxStyle}>
            <Box
              display="flex"
              flexDirection="column"
              maxWidth={235}
              textAlign="center"
            >
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
