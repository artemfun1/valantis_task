import { Items } from '../redux/slice/itemsSlice/itemsSlice'

export function getUniqueItems(responseItems: Items) {
	const map = new Map();
	for (let i = 0; i < responseItems.length; i++) {
		const element = responseItems[i];
		if (map.has(element.id)) {
			continue;
		}
		map.set(element.id, i);
	}

	const result: Items = [];
	map.forEach(value => {
		result.push(responseItems[value]);
	});
	return result;
}