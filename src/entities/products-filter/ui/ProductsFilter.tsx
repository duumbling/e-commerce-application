import React, { useState, forwardRef } from "react";
import { Dialog, DialogContent, Slide, useMediaQuery } from "@mui/material";
import { CustomButton } from "../../../shared/ui/CustomButton";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { FilterContent } from "./FilterContent/FilterContent";
import { type TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export function ProductsFilter() {
  const isTabletWidth = useMediaQuery("(max-width: 899px)");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  if (isTabletWidth) {
    return (
      <React.Fragment>
        <CustomButton
          variant="text"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          <FilterListOutlinedIcon sx={{ width: 42, height: 42 }} />
        </CustomButton>
        <Dialog
          open={isDialogOpen}
          maxWidth="lg"
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDialogClose}
        >
          <DialogContent>
            <FilterContent />
          </DialogContent>
          <CustomButton
            variant="text"
            sx={{ maxWidth: 55, margin: "auto" }}
            onClick={handleDialogClose}
          >
            <CloseOutlinedIcon sx={{ width: 55, height: 55 }} />
          </CustomButton>
        </Dialog>
      </React.Fragment>
    );
  }

  return <FilterContent />;
}
