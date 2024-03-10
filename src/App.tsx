import { useEffect } from "react";
import "./App.css";
import { Adminka } from "./components/Adminka";
import { FilterItems } from "./components/FilterItems";
import { ItemsList } from "./components/ItemList/ItemsList";
import { PaginationComponents } from "./components/Pagination";
import { fetchItems } from "./redux/slice/itemsSlice/fetchItems";
import { useAppDispatch, useAppSelector } from "./redux/store/useReduxHooks";

function App() {
	const dispatch = useAppDispatch();
	const result = useAppSelector(state => state.items);
	const fetchData = useAppSelector(state => state.items.fetchData);

	useEffect(() => {
		dispatch(
			fetchItems({ action: "get_ids", params: { offset: 0, limit: 99 } })
		);
	}, [dispatch]);

	if (result.status === "failed") {
		console.log('result.status === "failed"');
		dispatch(fetchItems(fetchData));
	}

	return (
		<div className="main">
			<Adminka />
			<FilterItems />
			<PaginationComponents />
			<ItemsList />
		</div>
	);
}

export default App;
