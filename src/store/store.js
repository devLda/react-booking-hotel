import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import userSlice from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import loaiphongSlice from "./loaiphong/loaiphongSlice";

const commonConfig = {
  storage,
};

const userConfig = {
  ...commonConfig,
  key: "app/login",
  whitelist: ["isLoggedIn", "token"],
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: persistReducer(userConfig, userSlice),
    loaiphong: loaiphongSlice,
  },
});

export const persistor = persistStore(store);
