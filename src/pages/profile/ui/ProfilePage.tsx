import React, { useEffect, useState } from "react";
import { BonusesList } from "../../../widgets/bonuses-list/";
import { Navigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";
import {
  CustomerInformationForm,
  AddressAccordion,
} from "../../../widgets/profile/";
import { isUserAuthenticated } from "../../../shared/api";
import { Header } from "../../../widgets/Header";
import { type Customer } from "@commercetools/platform-sdk";
import { getCustomerData } from "../../../shared/api/customers";
export function ProfilePage() {
  const [customerData, setCustomerData] = useState<Customer>();
  if (!isUserAuthenticated()) {
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
      <Header />
      <BonusesList />
      <CustomerInformationForm
        customerData={customerData}
        setCustomerData={setCustomerData}
      />
      <AddressAccordion
        customerData={customerData}
        setCustomerData={setCustomerData}
      />
    </div>
  );
}
