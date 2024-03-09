import { createAsyncThunk } from "@reduxjs/toolkit";
import { Items } from "./itemsSlice";
import { getItems, getItemsId } from "./utils/fetchData";

export const fetchItems = createAsyncThunk(
	"todos/fetchTodos",
	async (offset: number) => {
		const numGetItems = 200;

		const responseId: string[] = await getItemsId(offset, numGetItems);
		const responseItems: Items = await getItems(responseId);
		

		return  responseItems;
	}
);
