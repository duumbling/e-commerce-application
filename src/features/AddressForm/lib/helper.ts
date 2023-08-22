export const getOppositeAddressType = (
  type: "billingAddress" | "shippingAddress",
): "billingAddress" | "shippingAddress" => {
  return type === "billingAddress" ? "shippingAddress" : "billingAddress";
};
