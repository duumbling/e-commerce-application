import React from "react";
import { BonusesList } from "../../../widgets/bonuses-list/";
import { Navigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";
import {
  CustomerInformationForm,
  AddressAccordion,
} from "../../../widgets/profile/";
import { isUserAuthenticated } from "../../../shared/api";
import { Header } from "../../../widgets/Header";

export function ProfilePage() {
  if (!isUserAuthenticated()) {
    return <Navigate replace to={Paths.Login} />;
  }

  return (
    <div>
      <Header />
      <BonusesList />
      <CustomerInformationForm />
      <AddressAccordion />
    </div>
  );
}
