import { createSlice } from "@reduxjs/toolkit"
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    Email: "",
    Password: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },

  reducers: {
    clearState: (state) => {
      
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: {
   
  },
})
export const {  } = loginSlice.actions;

export default loginSlice.reducer;
export const loginSelector = state => state.login;