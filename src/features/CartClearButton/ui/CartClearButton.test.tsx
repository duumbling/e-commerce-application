import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartClearButton } from "./CartClearButton";
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../../../entities/cart";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    cartReducer,
  },
});

describe("CartClearButton component", () => {
  test("Render", () => {
    render(
      <Provider store={store}>
        <CartClearButton />
      </Provider>,
    );
    const buttonText = screen.queryByText("Очистить корзину");
    expect(buttonText).toBeInTheDocument();
  });

  test("Button text", () => {
    render(
      <Provider store={store}>
        <CartClearButton />
      </Provider>,
    );
    const buttonText = screen.queryByRole("button");
    expect(buttonText).toHaveTextContent("Очистить корзину");
  });

  test("Click", () => {
    render(
      <Provider store={store}>
        <CartClearButton />
      </Provider>,
    );

    const button = screen.queryByRole("button");
    if (button instanceof HTMLElement) {
      fireEvent.click(button);
    }

    const dialogText = screen.queryByText("Удалить все товары из корзины?");

    expect(dialogText).toBeInTheDocument();
  });
});
