import React from "react";
import { useSelector } from "react-redux";
import DatePicker from "../components/DatePicker";
import Info from "../components/Info";
import Meal from "../components/Meal";
import { getLastDishes } from "../functions/getlastDishes";

export default function HomePage() {
  const meals = useSelector((state) => state.meals);
  const { date } = useSelector((state) => state.date);
  const daylyMeals = meals.filter((meal) => meal.date === date);
  const lastDishes = getLastDishes(meals);
  return (
    <>
      <DatePicker />
      <Info />
      <Meal daylyMeals={daylyMeals} lastDishes={lastDishes} />
    </>
  );
}
