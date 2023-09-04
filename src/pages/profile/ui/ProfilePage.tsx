import React from "react";
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
    return <Navigate replace to={Paths.Login} />;
  }

  return (
    <div>
      <BonusesList />
      <CustomerInformationForm />
      <AddressAccordion />
    </div>
  );
}
