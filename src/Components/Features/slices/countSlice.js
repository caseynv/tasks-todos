import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    addCount: (state) => {
      state.value += 1;
    },
    subCount: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCount, subCount } = counterSlice.actions;

export default counterSlice.reducer;
