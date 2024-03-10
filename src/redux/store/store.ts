import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../slice/itemsSlice/itemsSlice";
import paginationReducer from "../slice/paginationSlice/paginationSlice";

export const store = configureStore({
	reducer: {
		items: itemsReducer,
		pagination: paginationReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
