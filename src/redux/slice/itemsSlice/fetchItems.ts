import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	// checkLength,
	getItems,
	getItemsId,
	getOffset,
	// getUniqueItems,
} from "./utils/fetchData";
import { Items } from './itemsSlice'

type OffsetProps = {
	offsetNum: number;
	stateOffset: number;
};
// obj: OffsetProps

export const fetchItems = createAsyncThunk(
	"todos/fetchTodos",
	async (obj: OffsetProps) => {
		const numGetItems = 200;

		const offset = getOffset(obj);
		const responseId:string[] = await getItemsId(offset, numGetItems);
		const responseItems:Items = await getItems(responseId);
		return { responseItems, offset };
	}
);
