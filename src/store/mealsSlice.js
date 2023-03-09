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
        isFavorite: false,
      },
    },
    {
      id: 3,
      date: "2023-03-09",
      weight: 100,
      dish: {
        id: 1,
        title: "Овочі, 🍅 🥒",
        proteins: 3,
        fats: 0,
        carbohydrates: 7,
        calories: 47,
        isFavorite: true,
      },
    },
    {
      id: 4,
      date: "2023-03-07",
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
      id: 5,
      date: "2023-03-08",
      weight: 100,
      dish: {
        id: 19,
        title: "Хек, минтай, камбала сира",
        proteins: 16.5,
        fats: 1.8,
        carbohydrates: 0,
        calories: 82,
        isFavorite: false,
      },
    },
    {
      id: 6,
      date: "2023-03-08",
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
        meal.id === action.payload.id &&
          ((meal.weight = action.payload.weight),
          (meal.dish.isFavorite = action.payload.isFavorite));
      });
    },
  },
});

export const { addMeal, deleteMeal, editMeal } = mealsSlice.actions;
export default mealsSlice.reducer;

// >>> TODO:
// update
