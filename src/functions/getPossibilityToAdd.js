import { isAfter } from "date-fns";
import { yesterday } from "../store/dateSlice";

export const getPossibilityToAdd = (date) => {
  const possibilityToAdd = isAfter(new Date(date), new Date(yesterday));
  return possibilityToAdd;
};
