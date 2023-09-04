import React, { useEffect, useState } from "react";
import { BonusesList } from "../../../widgets/bonuses-list/";
import { Navigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";
import {
  CustomerInformationForm,
  AddressAccordion,
} from "../../../widgets/profile/";
import { type Customer } from "@commercetools/platform-sdk";
import { getCustomerData } from "../../../shared/api/customers";
import { Grid } from "@mui/material";
import { ChangePasswordAccordion } from "../../../features/ChangePasswordAccordion";

export function ProfilePage() {
  const [customerData, setCustomerData] = useState<Customer>();
  const isAuthenticated = localStorage.getItem("fo-user_token") !== null;
  if (!isAuthenticated) {
    return <Navigate replace to={Paths.Login} />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCustomerData();
        setCustomerData(response.body);
      } catch (error) {
        console.log(error);
      }
    };
    void fetchData();
  }, []);
  return (
    <div>
      <BonusesList />
      <CustomerInformationForm
        customerData={customerData}
        setCustomerData={setCustomerData}
      />
      <Grid container justifyContent="center">
        <Grid item>
          <ChangePasswordAccordion />
        </Grid>
      </Grid>
      <AddressAccordion
        customerData={customerData}
        setCustomerData={setCustomerData}
      />
    </div>
  );
}
