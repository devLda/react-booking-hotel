import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import userSlice from "./user/userSlice";
import loaiphongSlice from "./loaiphong/loaiphongSlice";
import phongSlice from "./phong/phongSlice";
import datphongSlice from "./datphong/datphongSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const commonConfig = {
  storage,
};

const userConfig = {
  ...commonConfig,
  key: "app/user",
  whitelist: ["isLoggedIn", "current"],
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: persistReducer(userConfig, userSlice),
    loaiphong: loaiphongSlice,
    phong: phongSlice,
    datphong: datphongSlice,
  },
});

export const persistor = persistStore(store);
