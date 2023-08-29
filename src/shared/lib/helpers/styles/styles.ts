import type { SxProps, Theme } from "@mui/material";

export const backgroundIcon = (icon: string, position: string = "center") => {
  return { background: `url(${icon}) no-repeat ${position}` };
};

/**
 * Объединяет `sx`-стили. (Не работает с массивами)
 */
export const resolveSx = <T extends Theme>(
  ...sxs: Array<SxProps<T> | undefined>
): SxProps<T> => {
  return sxs.reduce((resolvedSx, sx): SxProps<T> => {
    return Object.assign(resolvedSx as object, sx ?? {});
  }, {}) as SxProps<T>;
};
