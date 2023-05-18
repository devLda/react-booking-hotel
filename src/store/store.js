import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import userSlice from "./user/userSlice";
import loaiphongSlice from "./loaiphong/loaiphongSlice";
import phongSlice from "./phong/phongSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

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
    phong: phongSlice,
  },
});

export const persistor = persistStore(store);
