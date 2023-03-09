import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import {
  getDailyСonsumedNutrients,
  getDaylyNorm,
  getPercentageOfNutrients,
} from "../functions/getNutrientsValues";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import {
  CAL,
  CALORIES,
  CARBOHIDR,
  FATS,
  INFO,
  PROTEINS,
  PUZO,
} from "../assets/CONSTANTS";

export default function Info() {
  const meals = useSelector((state) => state.meals);
  const { date } = useSelector((state) => state.date);
  const daylyMeals = meals.filter((meal) => meal.date === date);
  const weight = useSelector((state) => state.weight);
  const { normOfProteins, normOfFats, normOfCarbohydrates, normOfCalories } =
    getDaylyNorm(weight);

  const {
    dailyСonsumedCalories,
    dailyСonsumedProteins,
    dailyСonsumedFats,
    dailyСonsumedCarbohydrates,
  } = getDailyСonsumedNutrients(daylyMeals);
  const caloriesPercentage = Math.round(
    (dailyСonsumedCalories / normOfCalories) * 100
  );

  function getColorNotification(percent) {
    if (percent > 85) return "#DC2626";
    if (percent > 60 && percent <= 85) return "#FF7043";
    else return "#16A34A";
  }
  const colorNotification = getColorNotification(caloriesPercentage);

  const { proteinsPercent, fatsPercent, carbohydratesPercent } =
    getPercentageOfNutrients(
      normOfProteins,
      dailyСonsumedProteins,
      normOfFats,
      dailyСonsumedFats,
      normOfCarbohydrates,
      dailyСonsumedCarbohydrates
    );
  return (
    <div className="fixed top-3 left-2 right-2 w-fit z-40">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              style={{ backgroundColor: colorNotification }}
              className={`
                ${open ? "" : "text-opacity-90"}
                group flex items-center rounded-full py-2 pl-3 pr-5 text-xl font-medium text-white hover:text-opacity-100 focus:outline-none`}
            >
              <ChevronDownIcon className="mr-2 h-5 w-5 text-white" />
              {`${Math.round(dailyСonsumedCalories)} ${CAL} -
              ${Math.round((dailyСonsumedCalories / normOfCalories) * 100)}`}
              %
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="mt-3 max-w-xs">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="flex flex-col gap-4 bg-white py-7 px-5">
                    <Nutrient
                      nutrient={CALORIES}
                      concumed={dailyСonsumedCalories}
                      norm={normOfCalories}
                      percent={Math.round(
                        (dailyСonsumedCalories / normOfCalories) * 100
                      )}
                      colorNotification={colorNotification}
                      size="70px"
                    />
                    <Nutrient
                      nutrient={PROTEINS}
                      concumed={dailyСonsumedProteins}
                      norm={normOfProteins}
                      percent={proteinsPercent}
                      colorNotification={colorNotification}
                      size="60px"
                    />
                    <Nutrient
                      nutrient={FATS}
                      concumed={dailyСonsumedFats}
                      norm={normOfFats}
                      percent={fatsPercent}
                      colorNotification={colorNotification}
                      size="60px"
                    />
                    <Nutrient
                      nutrient={CARBOHIDR}
                      concumed={dailyСonsumedCarbohydrates}
                      norm={normOfCarbohydrates}
                      percent={carbohydratesPercent}
                      colorNotification={colorNotification}
                      size="60px"
                    />
                  </div>
                  <div className="bg-gray-50 px-6 py-4 select-none">
                    {/* <a
                      href="##"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    > */}
                    <span className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        {PUZO}
                      </span>
                    </span>
                    <span className="block text-sm text-gray-500">{INFO}</span>
                    {/* </a> */}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

function Nutrient({
  nutrient = "",
  concumed,
  norm,
  percent,
  colorNotification,
  size,
}) {
  return (
    <div className="flex items-center gap-4 select-none">
      <div style={{ width: size }}>
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          strokeWidth={12}
          styles={{
            path: {
              stroke: colorNotification,
              strokeLinecap: "round", // 'butt' or 'round'
              transition: "stroke-dashoffset 0.5s ease 0s",
              transform: "rotate(0.turn)",
              transformOrigin: "center center",
            },
            text: {
              fill: "#000",
              fontWeight: "bold",
            },
          }}
        />
      </div>
      {nutrient && (
        <span className="text-sm font-medium text-gray-900">
          {nutrient}: {concumed.toFixed(1)} / {norm.toFixed(1)} кал
        </span>
      )}
    </div>
  );
}
