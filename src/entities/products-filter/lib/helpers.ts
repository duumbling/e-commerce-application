import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";

export const isPlainEnumValue = (
  value: AttributePlainEnumValue | number,
): value is AttributePlainEnumValue => typeof value !== "number";
