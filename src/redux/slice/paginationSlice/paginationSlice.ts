import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Items } from '../itemsSlice/itemsSlice'

export type Pagination = {
	currentPage: number;
	elementsPerPages: number;
	lastIndex:number
	firstIndex:number
	currentItemsPage:Items
};


const initialState: Pagination = {
		currentPage: 1,
		lastIndex:0,
		firstIndex:0,
		elementsPerPages: 50,
		currentItemsPage:[] ,
};

export const paginationSlice = createSlice({
	name: "pagination",
	initialState,
	reducers: {
		setPagination: (state: Pagination, action: PayloadAction<Pagination>) => {
			state = {...state,...action.payload}
		},
	},
	selectors: {},
	
});

export const { setPagination } = paginationSlice.actions;

export default paginationSlice.reducer;
