import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch user details from api and store in redux store using async thunk

export const userdetails = createAsyncThunk(
  "slices/userdetails",
  async (_, thunkAPI) => {
    try {
      const { company_id, token_key } = thunkAPI.getState().auth;

      const response = await axios(
        `https://stage.api.sloovi.com/team?product=outreach&company_id=${company_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token_key}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
      
    } catch (error) {
      thunkAPI.rejectWithValue("something went wrong");
    }
  
  });
const usersSlice = createSlice({
  name: "users",
  initialState: {
    userDetails: null,
  },
  reducers: {
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
  extraReducers: {
    [userdetails.pending]: (state) => {
      state.userDetails = null;
    },
    [userdetails.fulfilled]: (state, action) => {
      console.log("ye", action.payload.results.data)
      state.userDetails = action.payload.results.data;
    },
    [userdetails.rejected]: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

// export action
export const { clearUserDetails } = usersSlice.actions;
// export reducer
export default usersSlice.reducer;
