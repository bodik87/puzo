import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const productsSlice = createSlice({
  name: "products",
  initialState: data,
  reducers: {
    addNewProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    editProduct: (state, action) => {
      state.map((product) => {
        product.id === action.payload.id &&
          ((product.title = action.payload.title),
          (product.proteins = action.payload.proteins),
          (product.fats = action.payload.fats),
          (product.carbohydrates = action.payload.carbohydrates),
          (product.calories = action.payload.calories));
      });
    },
    setFavorite: (state, action) => {
      state.map((product) => {
        product.id === action.payload.id &&
          (product.isFavorite = !action.payload.isFavorite);
      });
    },
  },
});

export const { addNewProduct, deleteProduct, editProduct, setFavorite } =
  productsSlice.actions;
export default productsSlice.reducer;
