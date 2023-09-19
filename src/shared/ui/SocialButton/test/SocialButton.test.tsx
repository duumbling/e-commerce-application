import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { SocialButton } from "../SocialButton";
import { BrowserRouter } from "react-router-dom";

const testSocialButton = (
  testName: string,
  href: string,
  icon: string = "",
) => {
  test(testName, () => {
    render(
      <BrowserRouter>
        <SocialButton href={href} icon={icon} />
      </BrowserRouter>,
    );
    const element = screen.getByLabelText("social-button", {
      exact: false,
    });
    expect(element).toBeInTheDocument();
    cleanup();
  });
};

describe("SocialButton component render", () => {
  testSocialButton("Is exists", "https://www.google.com");
});
