import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./dateSlice";
import mealsSlice from "./mealsSlice";
import productsSlice from "./productsSlice";
import weightSlice from "./weightSlice";

const reducer = {
  date: dateSlice,
  products: productsSlice,
  meals: mealsSlice,
  weight: weightSlice,
};

export const store = configureStore({ reducer });
