import React from "react";
import { render, screen } from "@testing-library/react";
import { AddressCard } from "./AddressCard";

describe("AddressCard component", () => {
  test("Render", () => {
    render(
      <AddressCard
        id=""
        addressTitle="Some address"
        addressInfo={{}}
        addressData={{
          country: "US",
          city: "NY",
          postalCode: "55555",
          streetName: "some name",
          version: 1,
        }}
        updateCardsList={async () => {}}
      />,
    );
    const addressTitle = screen.queryByText("Some address");
    expect(addressTitle).toBeInTheDocument();
  });
});
