import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { cardHeaderStyle, cardStyle, rootStyle } from "./style";
import { Box, Grid } from "@mui/material";
import { AdressTypeContainer } from "../../../shared/ui/AdressType/ui/AdressTypeContainer";
import { CustomerAddressForm } from "../../../widgets/profile";
import { type ProductCardProps } from "../model/types";
import { removeAddress } from "../../../shared/api/customers";

export function AddressCard({
  id,
  addressTitle,
  addressInfo,
  addressData,
  updateCardsList,
}: ProductCardProps) {
  const [activeProductId, setActiveProductId] = useState<
    null | string | undefined
  >(null);
  const [expanded, setExpanded] = useState(false);
  const isActive = activeProductId === id;
  useEffect(() => {
    void updateCardsList();
  }, [expanded]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    expanded ? setActiveProductId(id) : setActiveProductId(null);
  };
  const openedCardStyle = isActive ? { zIndex: 99 } : { zIndex: 0 };
  const removeCard = async () => {
    if (id !== undefined) {
      await removeAddress(id, addressData.version);
      await updateCardsList();
    }
  };
  return (
    <Grid>
      <Card sx={{ ...cardStyle, ...openedCardStyle }}>
        <CardHeader
          action={
            <>
              <IconButton
                aria-label="delete adress"
                onClick={() => {
                  void removeCard();
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="settings" onClick={handleExpandClick}>
                {expanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
              </IconButton>
            </>
          }
          title={addressTitle}
          subheader={
            <AdressTypeContainer
              isBilling={addressInfo.isBilling}
              isShipping={addressInfo.isShipping}
              isBillingDefault={addressInfo.isBillingDefault}
              isShippingDefault={addressInfo.isShippingDefault}
            />
          }
          sx={{ ...cardHeaderStyle }}
        />
        <Collapse
          in={expanded}
          timeout={200}
          easing="ease-in-out"
          unmountOnExit
        >
          <CardContent>
            <Box sx={rootStyle}>
              <CustomerAddressForm
                fieldLabelPosition="outside"
                addressData={addressData}
                addressID={id ?? ""}
                customerVersion={addressData.version}
                closeCard={handleExpandClick}
                addMode={false}
                defaultAddressTypes={addressInfo}
              />
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
