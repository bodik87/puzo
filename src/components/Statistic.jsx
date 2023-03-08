import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { CARB, FAT, PROT, PROTEINS } from "../assets/CONSTANTS";
import {
  getDailyСonsumedNutrients,
  getDaylyNorm,
  getPercentageOfNutrients,
} from "../functions/getNutrientsValues";

export default function Statistic() {
  const meals = useSelector((state) => state.meals);
  const weight = useSelector((state) => state.weight);
  const { normOfProteins, normOfFats, normOfCarbohydrates, normOfCalories } =
    getDaylyNorm(weight);

  const {
    dailyСonsumedCalories,
    dailyСonsumedProteins,
    dailyСonsumedFats,
    dailyСonsumedCarbohydrates,
  } = getDailyСonsumedNutrients(meals);
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
    <div className="flex items-center gap-2">
      <Nutrient
        percent={caloriesPercentage}
        colorNotification={colorNotification}
        size="100px"
      />
      <div className="grid grid-cols-3 gap-2">
        <Nutrient
          nutrient={PROT}
          percent={proteinsPercent}
          colorNotification={colorNotification}
          size="60px"
        />
        <Nutrient
          nutrient={FAT}
          percent={fatsPercent}
          colorNotification={colorNotification}
          size="60px"
        />
        <Nutrient
          nutrient={CARB}
          percent={carbohydratesPercent}
          colorNotification={colorNotification}
          size="60px"
        />
      </div>
    </div>
  );
}

function Nutrient({ nutrient = "", percent, colorNotification, size }) {
  return (
    <div style={{ width: size }}>
      <CircularProgressbar
        value={percent}
        text={`${nutrient} ${percent}%`}
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
  );
}

// function ProgressBar({ progressPercentage }) {
//   return (
//     <div className="h-[6px] w-full bg-gray-300 rounded-lg overflow-hidden">
//       <div
//         style={{ width: `${progressPercentage}%` }}
//         className={`h-full rounded-lg ${
//           progressPercentage > 90 ? "bg-red-600" : "bg-green-600"
//         }`}
//       ></div>
//     </div>
//   );
// }

// function Nutrient({ nutrient, nutrientPercent, daylyConsumed, norm }) {
//   return (
//     <div className="flex flex-col items-center gap-1">
//       <div className="font-semibold">{nutrient}</div>
//       <ProgressBar progressPercentage={nutrientPercent} />
//       <div className="flex text-sm">
//         <span>{Math.round(daylyConsumed)}</span>/<span>{Math.round(norm)}</span>
//         г
//       </div>
//     </div>
//   );
// }
