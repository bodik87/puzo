import { createSlice } from "@reduxjs/toolkit";
import { add, format } from "date-fns";

export const today = format(new Date(), "yyyy-MM-dd");
export const yesterday = format(add(new Date(), { days: -1 }), "yyyy-MM-dd");

const initialState = { date: today };

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    changeDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { changeDate } = dateSlice.actions;
export default dateSlice.reducer;
