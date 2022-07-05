import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getalltodo = createAsyncThunk(
  "slices/getalltodo",
  async (_, thunkAPI) => {
    const { company_id, token_key } = thunkAPI.getState().auth;
    try {
      const response = await axios(
        `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/?company_id=${company_id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token_key}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const gettodo = createAsyncThunk(
  "slices/gettodo",
  async (tododata, thunkAPI) => {
    const { company_id, token_key } = thunkAPI.getState().auth;
    try {
      const response = await axios(
        `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${tododata}?company_id=${company_id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token_key}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const createtodo = createAsyncThunk(
  "crudSlice/createtodo",
  async (enddata, thunkAPI) => {
    try {
      const { company_id, token_key, id } = thunkAPI.getState().auth;
      const response = await axios(
        `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token_key}`,
          },
          data: JSON.stringify({
            assigned_user: id,
            task_date: enddata.todate,
            task_time: enddata.totime,
            is_completed: enddata.is_completed,
            time_zone: enddata.timeZone,
            task_msg: enddata.Description,
          }),
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const edittodo = createAsyncThunk(
  "slices/edittodo",
  async (editdata, thunkAPI) => {
    try {
      const { company_id, token_key, id } = thunkAPI.getState().auth;
      const response = await axios(
        `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${editdata.task_id}?company_id=${company_id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token_key}`,
          },
          data: JSON.stringify({
            assigned_user: id,
            task_date: editdata.todate,
            task_time: editdata.totime,
            is_completed: editdata.is_completed,
            time_zone: editdata.timeZone,
            task_msg: editdata.Description,
          }),
        }
      );
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletetodo = createAsyncThunk(
  "slices/deletetodo",
  async (task, thunkAPI) => {
    try {
      const { company_id, token_key } = thunkAPI.getState().auth;
      const response = await axios(
        `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task.task_id}?company_id=${company_id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token_key}`,
          },
        }
      );
      // console.log(response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const crudSlice = createSlice({
  name: "todos",
  initialState: {
    isOpen: false,
    taskSucessMsg: "",
    isloading: false,
    singletodo: [],
    alltodo: [],
    deleteMsg: "",
    openform: false,
    details: null,
    detailtodos: null,
    detailtodo: null,
  },
  reducers: {
    setOpen: (state) => {
      state.isOpen = true;
    },
    editshow: (state) => {
      state.openform = true;
    },
    cleartodo: (state) => {
      state.singleTask = [];
    },
  },
  extraReducers: {
    [gettodo.fulfilled]: (state, action) => {
      console.log("ye", action.payload);
      state.isloading = false;
      state.isOpen = true;
      state.detailtodo = action.payload.results;
    },
    [gettodo.rejected]: (state) => {
      state.isloading = false;
    },
    [gettodo.pending]: (state) => {
      state.isloading = true;
    },

    [getalltodo.fulfilled]: (state, action) => {
      console.log("ye", action.payload);
      state.isloading = false;
      //state.isOpen = true;
      state.detailtodos = action.payload.results;
    },
    [getalltodo.rejected]: (state) => {
      state.isloading = false;
    },
    [getalltodo.pending]: (state) => {
      state.isloading = true;
    },

    [createtodo.fulfilled]: (state, action) => {
      console.log("ye", action.payload);
      state.isloading = false;
      state.isOpen = true;
      state.details = action.payload.results;
    },
    [createtodo.rejected]: (state) => {
      state.isloading = false;
    },
    [createtodo.pending]: (state) => {
      state.isloading = true;
    },

    [edittodo.fulfilled]: (state, action) => {
      console.log("ye", action.payload);
      state.isloading = false;
      state.isOpen = true;
      //state.details = "";
      state.singleTask = [...state.details, state.details];
    },
    [edittodo.rejected]: (state) => {
      state.isloading = false;
    },
    [edittodo.pending]: (state) => {
      state.isloading = true;
    },

    [deletetodo.fulfilled]: (state, action) => {
      console.log("ye", action.payload);
      state.isloading = false;
      state.isOpen = false;
      state.details = "";
      state.singleTask = [...state.details, state.details];
    },
    [deletetodo.rejected]: (state) => {
      state.isloading = false;
    },
    [deletetodo.pending]: (state) => {
      state.isloading = true;
    },
  },
});

export const { setOpen, editshow, cleartodo } = crudSlice.actions;

export default crudSlice.reducer;
