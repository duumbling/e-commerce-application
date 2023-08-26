import type { SxProps, Theme } from "@mui/material";

export type SX = SxProps<Theme>;

/**
 * Располагает фоновое изображение по центру
 */
export function bgIconCenter(icon: string) {
  return { background: `url(${icon}) no-repeat center` };
}
