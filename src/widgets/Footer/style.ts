import { type SxProps, type Theme } from "@mui/material";

type SXCollection = Record<string, SxProps<Theme>>;

export const socialButtonStyle: SXCollection = {
  iconButton: { flex: "1 0" },
  textButton: { flex: "1 0 auto" },
};
