import { createSlice } from "@reduxjs/toolkit";

const weightSlice = createSlice({
  name: "weight",
  initialState: 75,
  reducers: {
    updateWeight: (state, action) => (state = action.payload),
  },
});

export const { updateWeight } = weightSlice.actions;
export default weightSlice.reducer;
