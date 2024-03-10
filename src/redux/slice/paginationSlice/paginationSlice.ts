import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Items } from "../itemsSlice/itemsSlice";

export type Pagination = {
	currentPage: number;
	elementsPerPages: number;
	lastIndex: number;
	firstIndex: number;
	finalItems: Items;
	pageNumbers: number[];
	actualPageNumbers: number[];
	intervals: {
		intervalMin: number;
		intervalMax: number;
	};
};

const initialState: Pagination = {
	currentPage: 1,
	lastIndex: 0,
	firstIndex: 0,
	elementsPerPages: 50,
	pageNumbers: [],
	finalItems: [],
	actualPageNumbers: [],
	intervals: {
		intervalMin: 0,
		intervalMax: 10,
	},
};

export const paginationSlice = createSlice({
	name: "pagination",
	initialState,
	reducers: {
		setPagination: (
			state: Pagination,
			action: PayloadAction<{
				lastIndex: number;
				firstIndex: number;
				finalItems: Items;
			}>
		) => {
			state.lastIndex = action.payload.lastIndex;
			state.firstIndex = action.payload.firstIndex;
			state.finalItems = action.payload.finalItems;
		},
		setCurrentPage: (state: Pagination, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setCurrentPagePrev: (state: Pagination, action: PayloadAction<number>) => {
			if (state.currentPage === 1) {
				state.currentPage = 1;
			} else {
				state.currentPage = state.currentPage - action.payload;
			}
		},
		setCurrentPageNext: (state: Pagination, action: PayloadAction<number>) => {
			state.currentPage = state.currentPage + action.payload;
		},
		setPageNumbers: (state: Pagination, action: PayloadAction<number[]>) => {
			state.pageNumbers = [...action.payload];
		},
		setActualPageNumbers: (
			state: Pagination,
			action: PayloadAction<number[]>
		) => {
			state.actualPageNumbers = [...action.payload];
		},
		setIntervals: (
			state: Pagination,
			action: PayloadAction<{ intervalMin: number; intervalMax: number }>
		) => {
			state.intervals = { ...action.payload };
		},
		setElementsPerPages: (state: Pagination, action: PayloadAction<number>) => {
			state.elementsPerPages = action.payload;
		},
	},
	selectors: {},
});

export const {
	setPagination,
	setCurrentPage,
	setCurrentPagePrev,
	setCurrentPageNext,
	setPageNumbers,
	setActualPageNumbers,
	setIntervals,
	setElementsPerPages,
} = paginationSlice.actions;

export default paginationSlice.reducer;
