import { createSlice } from "@reduxjs/toolkit";
import { getUniqueItems } from "../../../utils/getUniqueItems";
import { fetchItems } from "./fetchItems";

export type Items = {
	brand: string | null;
	id: string;
	price: number;
	product: string;
}[];

export type StateItems = {
	status: "uninitialized" | "loading" | "succeeded" | "failed";
	items: Items;
	offset: number;
};

const initialState: StateItems = {
	status: "uninitialized",
	items: [],
	offset: 0,
};

export const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		setOffset: (state, action) => {
			state.offset = action.payload;
		},
	},
	selectors: {},
	extraReducers: builder => {
		builder
			.addCase(fetchItems.pending, state => {
				state.status = "loading";
			})

			.addCase(fetchItems.fulfilled, (state, action) => {
				state.status = "succeeded";
				const filterState = getUniqueItems([...state.items, ...action.payload]);
				state.items = [...filterState];
			})
			.addCase(fetchItems.rejected, (state, action) => {
				state.status = "failed";
				state.items = [];
				console.log(action.error);
			});
	},
});

export const { setOffset } = itemsSlice.actions;
export default itemsSlice.reducer;
