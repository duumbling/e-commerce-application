import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders learn react link", () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );

  expect(screen.getByText(/page/i)).toBeInTheDocument();
});
