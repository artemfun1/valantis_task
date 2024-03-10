import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUniqueItems } from "../../../utils/getUniqueItems";
import { fetchItems } from "./fetchItems";

export type Items = {
	brand: string | null;
	id: string;
	price: number;
	product: string;
	number: number;
}[];
export type FetchDataType = {
	action: "get_items" | "get_fields" | "filter" | "get_ids";
	params: {
		price?: number;
		offset?: number;
		limit?: number;
		field?: string;
		ids?: string[];
		product?: string;
		brand?: string;
	};
};

export type StateItems = {
	status: "uninitialized" | "loading" | "succeeded" | "failed";
	items: Items;
	fetchData: FetchDataType;
	error: string;
};

const initialState: StateItems = {
	status: "uninitialized",
	items: [],
	fetchData: { action: "get_ids", params: { offset: 0, limit: 99 } },
	error: "",
};

export const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		setOffset: (state, action: PayloadAction<number>) => {
			state.fetchData.params.offset = action.payload;
		},
		setFetchData: (state, action: PayloadAction<FetchDataType>) => {
			state.fetchData = { ...action.payload };
		},
		setItems: (state, action: PayloadAction<Items>) => {
			state.items = [...action.payload];
		},
		clearItems: state => {
			state.items = [];
		},
	},
	selectors: {},
	extraReducers: builder => {
		builder
			.addCase(fetchItems.pending, state => {
				state.status = "loading";
			})

			.addCase(fetchItems.fulfilled, (state, action) => {
				const arr = [...state.items];
				arr.sort((a, b) => a.number - b.number);

				const filterState = getUniqueItems([...arr, ...action.payload]);

				const addNumberPerItemsArr: Items = filterState.map((item, i) => ({
					brand: item.brand,
					id: item.id,
					price: item.price,
					product: item.product,
					number: i + 1,
				}));

				state.items = [...addNumberPerItemsArr];
				state.status = "succeeded";
				state.error = "";
			})
			.addCase(fetchItems.rejected, (state, action) => {
				console.log(action.error);
				state.status = "failed";
				if (action.error.message) {
					state.error = action.error.message;
				}
			});
	},
});

export const { setOffset, setFetchData, clearItems, setItems } =
	itemsSlice.actions;
export default itemsSlice.reducer;
