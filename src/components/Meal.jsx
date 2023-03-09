import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CAL,
  CALORIES,
  CARB,
  FAT,
  FAVORITES,
  NAME,
  PROT,
  SEARCH,
  WEIGHT,
} from "../assets/CONSTANTS";
import { HeartIcon } from "@heroicons/react/24/solid";
import Popup from "./Modals/Popup";
import SearchBox from "./SearchBox";

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

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    let lowerCase = e.target.value.toLowerCase().trim();
    const filteredData = products.filter((el) => {
      if (lowerCase === "") return products;
      else return el.title.trim().toLowerCase().includes(lowerCase);
    });
    setFilteredProducts(filteredData);
    setSearchQuery(lowerCase);
  };
  return (
    <>
      <Popup
        openedPopup={openedPopup}
        setOpenedPopup={setOpenedPopup}
        mealId={mealId}
        dishTitle={dishTitle}
      />
      <div className="relative mt-1 mx-2 overflow-y-auto shadow-md rounded-lg">
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

      <SearchBox />

      <div className="flex fixed w-full bottom-1 overflow-hidden">
        <div className="flex flex-nowrap overflow-x-auto -mb-2 sm:mb-0 pl-3">
          <div className="mt-1 mr-2">
            <HeartIcon
              style={{ fill: "#EF4444" }}
              className="h-8 w-8 animate-scale"
            />
          </div>
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="whitespace-nowrap text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-sm px-3 py-2.5 mr-1 mb-2 cursor-pointer select-none"
            >
              {product.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
