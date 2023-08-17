import type { SxProps, Theme } from "@mui/material";

/**
 * Объединяет `sx`-стили. (Не работает с массивами)
 */
export function resolveSx<T extends Theme>(
  ...sxs: Array<SxProps<T> | undefined>
): SxProps<T> {
  return sxs.reduce((resolvedSx, sx): SxProps<T> => {
    if (sx === undefined) sx = {};
    return Object.assign(resolvedSx as object, sx);
  }, {}) as SxProps<T>;
}
