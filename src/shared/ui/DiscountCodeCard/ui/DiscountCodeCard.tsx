import React, { useState } from "react";
import {
  Button,
  Typography,
  type PaperProps,
  ClickAwayListener,
} from "@mui/material";
import { cardActionAreaStyleProps, textStyleProps } from "./style";
import { ContentCopy, Done } from "@mui/icons-material";

export type DiscountCodeCardProps = PaperProps & {
  code: string;
};

export function DiscountCodeCard({ code }: DiscountCodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
  };

  const handleClickAway = () => {
    setCopied(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Button {...cardActionAreaStyleProps} onClick={handleClick}>
        <Typography {...textStyleProps}>
          {code}
          {copied ? <Done color="success" /> : <ContentCopy color="disabled" />}
        </Typography>
      </Button>
    </ClickAwayListener>
  );
}
