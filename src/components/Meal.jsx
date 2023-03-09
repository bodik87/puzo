import React, { useState } from "react";
import { useSelector } from "react-redux";
import Popup from "./Modals/Popup";
import SearchBox from "./SearchBox";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function Meal({ daylyMeals, lastDishes }) {
  const products = useSelector((state) => state.products);
  const favoriteProducts = products.filter((product) => product.isFavorite);
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

      <SearchBox favoriteProducts={favoriteProducts} />

      <div className="mt-3 relative">
        {daylyMeals.map((meal) => (
          <div
            key={meal.id}
            className="bg-blue-700 text-white backdrop-blur-xl shadow-sm relative mx-2 px-6 py-8 mb-2 rounded-3xl border border-gray-200"
          >
            <div
              onClick={() => handleClick(meal.id, meal.dish.title)}
              className="bg-white rounded-full shadow-md absolute z-10 top-3 right-4 p-1 text-gray-900 cursor-pointer hover:scale-105 transition-all"
            >
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </div>
            <p className="rounded-full text-white/70 ">
              {meal.weight}г - {(meal.dish.calories * meal.weight) / 100} кал
            </p>
            <div className="text-2xl font-semibold">
              {meal.dish.title.length < 28
                ? meal.dish.title
                : meal.dish.title.slice(0, 28)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
