import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../../../entities/cart";
import { searchKeywordsReducer } from "../../../entities/products-search";
import { categoriesReducer } from "../../../entities/category";
import { Provider } from "react-redux";
import { ProductCardsView } from "./ProductCardsView";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
  reducer: {
    searchKeywordsReducer,
    categoriesReducer,
    cartReducer,
  },
});

describe("ProductCardsView component", () => {
  test("Render", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductCardsView data-testid="product-cards-view" />
        </Provider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.queryAllByText(/Шлепанцы/)).not.toHaveLength(0);
    });

    const flipFlops = screen.queryAllByText(/Шлепанцы/i);

    expect(flipFlops.length).toBeGreaterThan(0);

    flipFlops.forEach((value) => {
      expect(value).toBeInTheDocument();
    });
  });
});
