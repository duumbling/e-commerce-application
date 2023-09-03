import React from "react";
import { Header } from "../../../shared/ui/Header";
import { BonusesList } from "../../../widgets/bonuses-list/";
import { Navigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";
import {
  CustomerInformationForm,
  AddressAccordion,
} from "../../../widgets/profile/";

export function ProfilePage() {
  const isAuthenticated = localStorage.getItem("fo-user_token") !== null;
  if (!isAuthenticated) {
    return <Navigate replace to={Paths.Main} />;
  }

  return (
    <div>
      <Header>Profile page</Header>
      <BonusesList />
      <CustomerInformationForm />
      <AddressAccordion />
    </div>
  );
}
