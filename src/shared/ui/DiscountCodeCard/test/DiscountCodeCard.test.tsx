import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { DiscountCodeCard } from "../ui/DiscountCodeCard";

describe("DiscountCodeCard component render", () => {
  test("Card rendering", () => {
    render(<DiscountCodeCard code="ABC" />);
    const card = screen.queryByText("ABC");
    expect(card).toBeInTheDocument();
    cleanup();
  });
});
