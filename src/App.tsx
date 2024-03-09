import clsx from "clsx";
import { useEffect, useRef } from "react";
import "./App.css";
import { ItemsList } from "./components/itemsList";
import { PaginationComponents } from "./components/pagination";
import { useToggleDisable } from "./hooks/useToggleDisable";
import { fetchItems } from "./redux/slice/itemsSlice/fetchItems";
import {
	setCurrentPageNext,
	setCurrentPagePrev,
} from "./redux/slice/paginationSlice/paginationSlice";
import { useAppDispatch, useAppSelector } from "./redux/store/useReduxHooks";
import { setOffset } from './redux/slice/itemsSlice/itemsSlice'

function App() {
	const dispatch = useAppDispatch();
	const result = useAppSelector(state => state.items);
	const offset = useAppSelector(state => state.items.offset);
	const paginationState = useAppSelector(state => state.pagination);

	useEffect(() => {
		dispatch(
			fetchItems(offset)
		);
	}, [dispatch, offset]);

	if (result.status === "failed") {
		dispatch(
			fetchItems(offset)

		);
	}
	function handleClickPrevPage() {
		dispatch(setCurrentPagePrev(1));
	}

	function handleClickNextPage() {
		dispatch(setCurrentPageNext(1));
		
		if (
			paginationState.currentPage ===
			paginationState.pageNumbers[paginationState.pageNumbers.length - 2]
		) {
			dispatch(
				fetchItems(200)
			);
			dispatch(
				setOffset(offset+200)
			);

		}
	}

	const paginationDivRef = useRef<HTMLDivElement>(null);

	useToggleDisable({ paginationDivRef });

	return (
		<div>
			<button> Название </button>
			<button> Цена </button>
			<button> Бренд </button> <br />
			<div
				ref={paginationDivRef}
				className={clsx('paginationBlock',result.status === "loading" ? "disabledDiv" : "")}
			>
				<button onClick={handleClickPrevPage}>Prev Page</button>
<PaginationComponents />...
				<button onClick={handleClickNextPage}>Next Page</button>

				
			</div>
			<ul>
				<li>
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
