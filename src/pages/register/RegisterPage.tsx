import React, { useEffect } from "react";
import { Header } from "../../shared/ui/Header";
import { RegistrationForm } from "../../widgets/registration-form";
import { customerTokenCache } from "../../shared/api";
import { Paths } from "../../shared/constants/paths";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const cachedToken = customerTokenCache.get().token;
  const navigate = useNavigate();
  useEffect((): void => {
    if (cachedToken !== "") {
      navigate(Paths.Main);
    }
  }, [cachedToken]);
  return (
    <div>
      <Header>Register page</Header>
      <RegistrationForm />
    </div>
  );
}
