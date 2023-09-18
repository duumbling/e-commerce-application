import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { PriceTag } from "../PriceTag";

const testPriceTag = (
  testName: string,
  price: number,
  discountPrice?: number,
  currency: string = "Р",
) => {
  test(testName, () => {
    render(
      <PriceTag
        price={price}
        discountPrice={discountPrice}
        currency={currency}
      />,
    );
    const element = screen.queryByText(`${discountPrice ?? price} ${currency}`);
    expect(element).toBeInTheDocument();
    cleanup();
  });
};

describe("PriceTag component render", () => {
  testPriceTag("Price", 100);
  testPriceTag("Discount price", 100, 50);
  testPriceTag("Discount price is 0", 100, 0);
  testPriceTag("Discount price is undefined", 100, undefined);
  testPriceTag('Currency is "$"', 100, 50, "$");
});
