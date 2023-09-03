import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AddressCard } from "../../../features/AddressCard";
import {
  gridContainerProps,
  gridItemProps,
  paginationStyle,
  titleBoxStyle,
  titleStyle,
} from "./style";
import { setAddressInformation } from "./lib/helpers";
import { type Customer } from "@commercetools/platform-sdk";
import { getCustomerData } from "../../../shared/api/customers";
import { AddButton } from "../../../shared/ui/addButton/AddButton";
import { CustomerAddressForm } from "../index";

export function AddressAccordion() {
  const [customerData, setCustomerData] = useState<Customer>();
  const [addAddressMode, setAddAddressMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

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
  const updateCardsList = async (): Promise<void> => {
    const response = await getCustomerData();
    setCustomerData(response.body);
  };

  return (
    <Box>
      <Grid
        {...gridContainerProps}
        sx={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <Grid
          sx={{
            ...gridItemProps,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid sx={titleBoxStyle}>
            <Typography variant="h5" component="p" sx={{ ...titleStyle }}>
              {customerData?.addresses.length === 0 ? "Адресов нет" : "Адреса"}
            </Typography>
            <AddButton
              onClick={() => {
                setAddAddressMode(!addAddressMode);
              }}
              state={addAddressMode}
            />
          </Grid>
          {addAddressMode ? (
            <CustomerAddressForm
              fieldLabelPosition="outside"
              customerVersion={customerData?.version ?? 0}
              addMode={true}
              setAddMode={setAddAddressMode}
            />
          ) : customerData?.addresses.length === 0 ? (
            <div></div>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: 5,
              }}
            >
              {customerData?.addresses
                .slice(startIndex, endIndex)
                .map((address, index) => (
                  <AddressCard
                    key={index}
                    addressTitle={`${
                      address.country === "RU" ? "Россия" : "Беларусь"
                    }, ${address.city ?? ""}, ул. ${
                      address.streetName ?? ""
                    }, индекс: ${address.postalCode ?? ""}`}
                    id={address.id}
                    addressInfo={setAddressInformation(customerData, address)}
                    addressData={{
                      country: address.country === "RU" ? "Россия" : "Беларусь",
                      city: address.city ?? "",
                      streetName: address.streetName ?? "",
                      postalCode: address.postalCode ?? "",
                      version: customerData.version,
                    }}
                    updateCardsList={updateCardsList}
                  />
                ))}
              <Stack spacing={2}>
                <Pagination
                  count={5}
                  page={currentPage}
                  onChange={handlePageChange}
                  shape="rounded"
                  sx={{ ...paginationStyle }}
                />
              </Stack>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
