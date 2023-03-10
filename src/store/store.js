import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dateSlice from "./dateSlice";
import mealsSlice from "./mealsSlice";
import productsSlice from "./productsSlice";
import weightSlice from "./weightSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const reducer = {
  date: dateSlice,
  products: productsSlice,
  meals: mealsSlice,
  weight: weightSlice,
};

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  // habits: habitsSlice.reducer,
  date: dateSlice,
  products: productsSlice,
  meals: mealsSlice,
  weight: weightSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

// export const store = configureStore({ reducer });
