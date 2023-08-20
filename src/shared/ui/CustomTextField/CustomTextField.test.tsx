import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomTextField } from "./CustomTextField";

describe("CustomButton component render", () => {
  test("TextField Rendering", () => {
    render(
      <CustomTextField data-testid="custom-field">TextField</CustomTextField>,
    );
    const field = screen.getByTestId("custom-field");
    expect(field).toBeInTheDocument();
    cleanup();
  });

  test("TextField values", () => {
    render(
      <form data-testid="form">
        <CustomTextField name="firstName" value="John" />
        <CustomTextField name="lastName" value="Doe" />
      </form>,
    );
    const form = screen.getByTestId("form");
    expect(form).toHaveFormValues({
      firstName: "John",
      lastName: "Doe",
    });
    cleanup();
  });
});
