import { configureStore, combineReducers } from "@reduxjs/toolkit";
import visibleReducer from "../slices/visibleSlice";
import counterReducer from "../slices/countSlice";
import authReducer from "../slices/authSlice";
import usersdetailReducer from "../slices/usersSlice";
import crudReducer from "../slices/crudSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["authReducer", "usersdetailReducer", "crudReducer"], //Things u want to persist
};

const reducers = combineReducers({
  visible: visibleReducer,
  counter: counterReducer,
  auth: authReducer,
  users: usersdetailReducer,
  todos: crudReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "your/action/type",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});

const persistor = persistStore(store);
 

export {
  store,
  persistor,
};
