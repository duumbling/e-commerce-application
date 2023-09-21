import React from "react";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../../../entities/cart";
import { Provider } from "react-redux";
import { DiscountCodeField } from "./DiscountCodeField";

const store = configureStore({
  reducer: {
    cartReducer,
  },
});

describe("DiscountCodeField component", () => {
  test("Render", () => {
    render(
      <Provider store={store}>
        <DiscountCodeField data-testid="discount-field" />
      </Provider>,
    );
    const input = screen.queryByTestId("discount-field");
    const buttonText = screen.queryByText("Применить");

    expect(input).toBeInTheDocument();
    expect(buttonText).toBeInTheDocument();
  });
});
