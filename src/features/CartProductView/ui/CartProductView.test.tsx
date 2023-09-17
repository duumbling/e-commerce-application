import React from "react";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../../../entities/cart";
import { Provider } from "react-redux";
import { CartProductView } from "./CartProductView";

const store = configureStore({
  reducer: {
    cartReducer,
  },
});

describe("CartClearButton component", () => {
  test("Render", () => {
    const size = 40;
    const color = "Черный";
    const quantity = 1;
    const price = 850;

    render(
      <Provider store={store}>
        <CartProductView
          data={{
            id: "",
            title: "Кроссовки PUMA",
            size,
            color,
            image: "",
            price,
            quantity,
            totalPrice: 850,
          }}
        />
      </Provider>,
    );

    const titleText = screen.queryByText("Кроссовки PUMA");
    const sizeText = screen.queryByText(`Размер: ${size}`);
    const colorText = screen.queryByText(`Цвет: ${color}`);
    const quantityText = screen.queryByText(quantity);
    const priceTexts = screen.queryAllByText(`${price} Р`);

    expect(titleText).toBeInTheDocument();
    expect(sizeText).toBeInTheDocument();
    expect(colorText).toBeInTheDocument();
    expect(quantityText).toBeInTheDocument();
    priceTexts.forEach((text) => {
      expect(text).toBeInTheDocument();
    });
  });
});
