import { createSlice } from "@reduxjs/toolkit";
import { getUniqueItems } from "../../../utils/getUniqueItems";
import { fetchItems } from "./fetchItems";

export type Items = {
	brand: string | null;
	id: string;
	price: number;
	product: string;
	number:number
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
				const filterState = getUniqueItems([...state.items, ...action.payload]);

				const addNumberPerItemsArr:Items = filterState.map((item,i)=>({brand: item.brand,
					id: item.id,
					price: item.price,
					product: item.product,
					number: i+1})
					
			)

			

				state.items = [...addNumberPerItemsArr];
				state.status = "succeeded";
			})
			.addCase(fetchItems.rejected, (state, action) => {
				console.log(action.error);
				state.status = "failed";
			});
	},
});

export const { setOffset } = itemsSlice.actions;
export default itemsSlice.reducer;
