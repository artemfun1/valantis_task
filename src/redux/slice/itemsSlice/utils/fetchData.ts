import axios from "axios";
import { md5 } from "js-md5";
import { getDate } from "../../../../utils/getDate";



export async function getItemsId(offset: number, numGetItems: number) {
	console.log()
	const responseId = await axios({
		method: "POST",
		url: "http://api.valantis.store:40000/",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
			"X-Auth": md5(`Valantis_${getDate()}`),
		},
		data: JSON.stringify({
			action: "get_ids",
			params: { offset: offset, limit: numGetItems },
		}),
	});

	return responseId.data.result;
}

export async function getItems(responseId: string[]) {
	const responseItem = await axios({
		method: "POST",
		url: "http://api.valantis.store:40000/",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
			"X-Auth": md5(`Valantis_${getDate()}`),
		},
		data: JSON.stringify({
			action: "get_items",
			params: { ids: responseId },
		}),
	});
	return responseItem.data.result;
}

