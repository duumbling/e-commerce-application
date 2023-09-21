import React from "react";
import { render, screen } from "@testing-library/react";
import { AboutUsItem } from "./AboutUsItem";

describe("AboutUsItem component", () => {
  test("Render", () => {
    render(<AboutUsItem image="" bio="Some info" link="" />);
    const firstPart = screen.queryByText("Some");
    const secondPart = screen.queryByText("info");
    expect(firstPart).toBeInTheDocument();
    expect(secondPart).toBeInTheDocument();
  });
});
