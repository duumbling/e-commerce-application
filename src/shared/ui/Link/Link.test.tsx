import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Link } from "./Link";
import { Paths } from "../../constants/paths";
import { BrowserRouter } from "react-router-dom";

describe("Link component render", () => {
  test("Link Rendering", () => {
    render(
      <BrowserRouter>
        <Link href={Paths.NotFound}>Render link</Link>
      </BrowserRouter>,
    );
    const link = screen.queryByText("Render link");
    expect(link).toBeInTheDocument();
  });

  test("Link Text", () => {
    render(
      <BrowserRouter>
        <Link href={Paths.NotFound}>Render link</Link>
      </BrowserRouter>,
    );
    const link = screen.queryByText("Render link");
    expect(link).toHaveTextContent("Render link");
  });
});

describe("Link component href", () => {
  const testLinkHref = (path: Paths) => {
    render(
      <BrowserRouter>
        <Link href={path}>Some link</Link>
      </BrowserRouter>,
    );
    const link = screen.queryByText("Some link");
    test("Link Href", () => {
      let domain = "http://localhost";
      if (path === Paths.NotFound) {
        domain += "/";
      }
      expect(link).toHaveProperty("href", `${domain}${path}`);
    });
    cleanup();
  };

  testLinkHref(Paths.Main);
  testLinkHref(Paths.Login);
  testLinkHref(Paths.Register);
  testLinkHref(Paths.NotFound);
});
