import { type SxProps, type Theme } from "@mui/material";

export const radioStyle = (color: string): SxProps<Theme> => ({
  outline: `solid .1rem #888`,
  outlineOffset: "-0.5rem",
  color,
  "&.Mui-checked": {
    color,
  },
});
