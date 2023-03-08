import { add, format } from "date-fns";

export function getLastDishes(meals) {
  const yesterday = format(add(new Date(), { days: -1 }), "yyyy-MM-dd");
  const dayBeforeYesterday = format(
    add(new Date(), { days: -2 }),
    "yyyy-MM-dd"
  );
  const threeDaysAgo = format(add(new Date(), { days: -3 }), "yyyy-MM-dd");

  const yesterdaysDishes = meals
    .filter((meal) => meal.date === yesterday)
    .map((meal) => meal.dish);
  const dayBeforeYesterdayDishes = meals
    .filter((meal) => meal.date === dayBeforeYesterday)
    .map((meal) => meal.dish);
  const threeDaysAgoDishes = meals
    .filter((meal) => meal.date === threeDaysAgo)
    .map((meal) => meal.dish);

  const previousDishes = [
    ...yesterdaysDishes,
    ...dayBeforeYesterdayDishes,
    ...threeDaysAgoDishes,
  ];

  const lastThreeDaysDishes = [
    ...new Set(previousDishes.map((dish) => JSON.stringify(dish))),
  ].map((str) => JSON.parse(str));

  return lastThreeDaysDishes;
}
