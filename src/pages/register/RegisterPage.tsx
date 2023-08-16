import React from "react";
import { Header } from "../../shared/ui/Header";
import { RegistrationForm } from "../../widgets/registration-form";

export function RegisterPage() {
  return (
    <div>
      <Header>Register page</Header>
      <RegistrationForm />
    </div>
  );
}
