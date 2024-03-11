import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchDataType, Items } from "./itemsSlice";
import { getItems, getItemsId } from "./utils/fetchData";

export const fetchItems = createAsyncThunk(
	"todos/fetchTodos",
	async (fetchData: FetchDataType) => {
		const responseId: string[] = await getItemsId(fetchData);

		const responseItems: Items = await getItems(responseId);

		return responseItems;
	}
);


