import { createSlice } from "@reduxjs/toolkit";
const mealsSlice = createSlice({
  name: "meals",
  initialState: [],
  reducers: {
    addMeal: (state, action) => {
      state.push(action.payload);
    },
    deleteMeal: (state, action) => {
      return state.filter((meal) => meal.id !== action.payload);
    },
    editMeal: (state, action) => {
      state.map((meal) => {
        meal.id === action.payload.id && (meal.weight = action.payload.weight);
      });
    },
  },
});

export const { addMeal, deleteMeal, editMeal } = mealsSlice.actions;
export default mealsSlice.reducer;

// >>> TODO:
// update
