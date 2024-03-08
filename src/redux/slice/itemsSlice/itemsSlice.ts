import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchItems } from './fetchItems'
import { getUniqueItems } from '../../../utils/getUniqueItems'


export type Items = {
	brand: string | null;
	id: string;
	price: number;
	product: string;
}[]

export type StateItems = {
	status:"uninitialized"|"loading"|"succeeded"|"failed"
	items:Items
	offset:number
	currentPage:number
	totalPages:number
}

const initialState:StateItems = {
	status: "uninitialized",
	items: [],
	offset:0,
	currentPage:1,
	totalPages:3
};

export const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		setCurrentPage:(state:StateItems,action:PayloadAction<number>)=>{
			state.currentPage = action.payload
		}
	},
  selectors:{},
	extraReducers: builder => {
		builder
			.addCase(fetchItems.pending, (state) => {
				state.status = "loading";
			})

			.addCase(fetchItems.fulfilled, (state, action) => {
				state.status = "succeeded";
				const filterState = getUniqueItems([...state.items, ...action.payload.responseItems]) 
				state.items =[...filterState]
				state.offset = action.payload.offset;
			})
			.addCase(fetchItems.rejected, (state, action) => {
				state.status = "failed";
				state.items = [];
				console.log(action.error) ;
				
			});
	},
});

export const {
	setCurrentPage
} = itemsSlice.actions;



export default itemsSlice.reducer;
