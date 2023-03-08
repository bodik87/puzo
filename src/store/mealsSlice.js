import { createSlice } from "@reduxjs/toolkit";
const mealsSlice = createSlice({
  name: "meals",
  initialState: [
    {
      id: 1,
      date: "2023-03-09",
      weight: 100,
      dish: {
        id: 13,
        title: "Сир нежирний",
        proteins: 18,
        fats: 1.8,
        carbohydrates: 0.7,
        calories: 88,
        isFavorite: false,
      },
    },
    {
      id: 2,
      date: "2023-03-09",
      weight: 100,
      dish: {
        id: 19,
        title: "Хек, минтай, камбала сира",
        proteins: 16.5,
        fats: 1.8,
        carbohydrates: 0,
        calories: 82,
        isFavorite: true,
      },
    },
    {
      id: 3,
      date: "2023-03-09",
      weight: 100,
      dish: {
        id: 13,
        title: "Сир нежирний",
        proteins: 18,
        fats: 1.8,
        carbohydrates: 0.7,
        calories: 88,
        isFavorite: false,
      },
    },
  ],
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
