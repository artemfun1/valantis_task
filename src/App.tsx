import clsx from "clsx"
import { useEffect, useRef } from "react"
import "./App.css"
import { ItemsList } from "./components/ItemsList"

import { useToggleDisable } from "./hooks/useToggleDisable"
import { fetchItems } from "./redux/slice/itemsSlice/fetchItems"
import { useAppDispatch, useAppSelector } from "./redux/store/useReduxHooks"
import { PaginationComponents } from './components/Pagination'

function App() {
	const dispatch = useAppDispatch();
	const result = useAppSelector(state => state.items);
	const offset = useAppSelector(state => state.items.offset);

	useEffect(() => {
		dispatch(fetchItems(0));
	}, [dispatch]);

	if (result.status === "failed") {
		console.log('result.status === "failed"');
		dispatch(fetchItems(offset));
	}

	const paginationDivRef = useRef<HTMLDivElement>(null);

	useToggleDisable({ paginationDivRef });

	return (
		<div className="main">
			<div>
				
		
				<button> Название </button>
				<button> Цена </button>
				<button> Бренд </button> <br />


			</div>

			<div
				ref={paginationDivRef}
				className={clsx(
					"paginationBlock",
					result.status === "loading" ? "disabledDiv" : ""
				)}
			>
				<PaginationComponents />
			</div>
			<ul>
				<li>
					<div className="productNumber">№</div>
					<div className="productTitle">Название</div>
					<div className="productPrice">Цена</div>
					<div className="productBrand">Бренд</div>
					<div className="productId">Id</div>
				</li>
				{result.status === "loading" && <h2>Loading...</h2>}
				{result.status === "succeeded" && <ItemsList />}
			</ul>
		</div>
	);
}

export default App;
