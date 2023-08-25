import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomButton } from "./CustomButton";

describe("CustomButton component render", () => {
  test("Button Rendering", () => {
    render(<CustomButton>Button</CustomButton>);
    const button = screen.queryByText("Button");
    expect(button).toBeInTheDocument();
    cleanup();
  });
  test("Button Text", () => {
    render(<CustomButton>Some button</CustomButton>);
    const button = screen.queryByText("Some button");
    expect(button).toHaveTextContent("Some button");
    cleanup();
  });

  test("Button Click", () => {
    let clicked = false;
    render(
      <CustomButton
        onClick={() => {
          clicked = true;
        }}
      >
        Button
      </CustomButton>,
    );

    const button = screen.queryByText("Button");
    if (button instanceof HTMLElement) {
      fireEvent.click(button);
    }

    expect(clicked).toBeTruthy();
  });

  const testButtonVariant = (variant: "contained" | "outlined" | "text") => {
    render(<CustomButton variant={variant}>Button</CustomButton>);
    const button = screen.queryByText("Button");
    expect(button).toHaveClass(`MuiButton-${variant}`);
    cleanup();
  };

  testButtonVariant("contained");
  testButtonVariant("outlined");
  testButtonVariant("text");
});
