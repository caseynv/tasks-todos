import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "slices/fetchUsers",
  async (userdata, thunkAPI) => {
    try {
      const response = await axios("https://stage.api.sloovi.com/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email: userdata.email,
          password: userdata.password,
        }),
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Oops!");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    message: null,
    token_key: null,
    error: null,
    loading: false,
    company_id: null,
    id: null,
    name: null,
    picture: null,
  },
  reducers: {
    exit: (state) => {
      state.Auth = false;
      state.token_key = null;
      state.error = null;
      state.loading = false;
      state.company_id = null;
      state.id = null;
      state.picture = null;
      state.name = null;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      //console.log("ye", action.payload)
      state.Auth = true;
      state.loading = false;
      state.token_key = action.payload.results.token;
      state.company_id = action.payload.results.company_id;
      state.id = action.payload.results.user_id;
      state.picture = action.payload.results.icon;
      state.name = action.payload.results.name;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.Auth = true;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { exit } = authSlice.actions;

export default authSlice.reducer;
