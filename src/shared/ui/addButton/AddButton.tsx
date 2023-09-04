import React from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface AddButtonProps {
  onClick: () => void;
  state: boolean;
}

export function AddButton({ onClick, state }: AddButtonProps) {
  return (
    <IconButton aria-label="add-address" onClick={onClick}>
      {state ? <KeyboardArrowLeftIcon /> : <AddIcon />}
    </IconButton>
  );
}
