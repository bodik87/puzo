import React, { useState } from "react";
import { CALORIES, NAME, WEIGHT } from "../assets/CONSTANTS";
import Popup from "./Modals/Popup";

export default function Meal({ daylyMeals, lastDishes }) {
  const [openedPopup, setOpenedPopup] = useState(false);
  const [mealId, setMealId] = useState("");
  const [dishTitle, setDishTitle] = useState("");
  const handleClick = (id, title) => {
    setMealId(id);
    setOpenedPopup(true);
    setDishTitle(title);
  };
  return (
    <>
      <Popup
        openedPopup={openedPopup}
        setOpenedPopup={setOpenedPopup}
        mealId={mealId}
        dishTitle={dishTitle}
      />
      <div className="relative mt-1 overflow-y-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-slate-300">
            <tr>
              <th scope="col" className="w-3/4 px-3 py-3">
                {NAME}
              </th>
              <th scope="col" className="text-center px-2 py-3">
                {WEIGHT}
              </th>
              <th scope="col" className="text-center px-2 py-3">
                {CALORIES}
              </th>
            </tr>
          </thead>
          <tbody className="">
            {daylyMeals.map((meal) => (
              <tr
                key={meal.id}
                onClick={() => handleClick(meal.id, meal.dish.title)}
                className={`bg-slate-50 border-b odd:bg-white ${
                  meal.dish.isFavorite && "bg-red-50 odd:bg-red-50"
                } cursor-pointer`}
              >
                <th
                  scope="row"
                  className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  {meal.dish.title.length < 28
                    ? meal.dish.title
                    : meal.dish.title.slice(0, 28)}
                </th>
                <td className="text-center py-4 px-2">{meal.weight}</td>
                <td className="text-center py-4 px-2">
                  {(meal.dish.calories * meal.weight) / 100}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
