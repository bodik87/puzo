import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { deleteMeal, editMeal } from "../store/mealsSlice";
import MealOptions from "./Popups/MealOptions";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Heart } from "@heroicons/react/24/solid";

export default function Meal({ daylyMeals, lastDishes }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const favoriteProducts = products.filter((product) => product.isFavorite);
  const [openedPopup, setOpenedPopup] = useState(false);
  const [editableMeal, setEditableMeal] = useState("");
  const [productTitle, setProductTitle] = useState("");

  const handleClick = (meal, title) => {
    setEditableMeal(meal);
    setOpenedPopup(true);
    setProductTitle(title);
  };

  const handleDelete = (id) => {
    dispatch(deleteMeal(id));
    setOpenedPopup(false);
  };

  const handleEditWeight = (meal) => {
    dispatch(editMeal(meal));
    setOpenedPopup(false);
  };

  const handleIncreaseWeight = (meal) => {
    dispatch(editMeal(meal));
    setOpenedPopup(false);
  };

  return (
    <>
      <MealOptions
        openedPopup={openedPopup}
        setOpenedPopup={setOpenedPopup}
        editableMeal={editableMeal}
        productTitle={productTitle}
        onDelete={handleDelete}
        onEdit={handleIncreaseWeight}
      />

      <SearchBox favoriteProducts={favoriteProducts} />

      <div className="mt-3 relative">
        {daylyMeals.length ? (
          <>
            {daylyMeals.map((meal) => (
              <div
                key={meal.id}
                className="bg-blue-700 text-white backdrop-blur-xl shadow-sm relative mx-2 px-6 pt-6 pb-5 mb-2 rounded-3xl border border-gray-200"
              >
                <div
                  onClick={() => handleClick(meal, meal.dish.title)}
                  className="bg-white rounded-full shadow-md absolute z-10 top-3 right-4 p-1 text-gray-900 cursor-pointer hover:scale-105 transition-all"
                >
                  <EllipsisHorizontalIcon className="h-6 w-6" />
                </div>
                <p className="rounded-full text-white/70">
                  {meal.weight}г -{" "}
                  {Math.round((meal.dish.calories * meal.weight) / 100)} кал
                </p>
                <div className="text-2xl font-semibold mt-2">
                  {meal.dish.title.length < 28
                    ? meal.dish.title
                    : meal.dish.title.slice(0, 28) + "..."}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="bg-white/50 text-gray-900 backdrop-blur-xl shadow-sm relative mx-2 px-6 pt-6 pb-6 mb-2 rounded-3xl border border-gray-200">
            <div
              // onClick={() => handleClick(meal.id, meal.dish.title)}
              className="bg-white rounded-full shadow-md absolute z-10 top-3 right-4 py-1 px-3 text-gray-900 cursor-pointer hover:scale-105 transition-all"
            >
              Додати з останніх
            </div>
            <p className="rounded-full text-gray-900">Пусто</p>
            <div className="text-2xl font-semibold">Додайте продукт</div>
          </div>
        )}
      </div>
    </>
  );
}
