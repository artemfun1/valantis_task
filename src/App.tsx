import { useEffect, useRef } from "react";
import "./App.css";
import { ItemsList } from "./components/itemsList";
import { useToggleDisable} from "./hooks/useToggleDisable";
import { fetchItems } from "./redux/slice/itemsSlice/fetchItems";
import { useAppDispatch, useAppSelector } from "./redux/store/useReduxHooks";
import { PaginationComponents } from './components/pagination'
import clsx from 'clsx'

function App() {
	const dispatch = useAppDispatch();
	const result = useAppSelector(state => state.items);
	const offset = useAppSelector(state => state.items.offset);
	// console.log(offset)

	useEffect(() => {
		dispatch(
			fetchItems(
				{
				offsetNum: 0,
				stateOffset: offset,
			}
			)
		);
	}, [dispatch, offset]);

	if (result.status === "failed") {
		dispatch(
			fetchItems(
				{
				offsetNum: 0,
				stateOffset: offset,
			}
			)
		);
	}
	function handleClickMinus() {
		dispatch(
			fetchItems(
				{
				offsetNum: -99,
				stateOffset: offset,
			}
			)
		);
	}
	function handleClickPlus() {
		dispatch(
			fetchItems(
				{
				offsetNum: 99,
				stateOffset: offset,
			}
			)
		);
	}

	const paginationDivRef = useRef<HTMLDivElement>(null);
	
	useToggleDisable({paginationDivRef});

	return (
		<div>
			<button> Название </button>
			<button> Цена </button>
			<button> Бренд </button> <br />
			
			<div ref={paginationDivRef} className={clsx(result.status === "loading"?'disabledDiv':'')}>
				<button onClick={handleClickMinus}>
					Предыдущая страница
				</button>
				<button onClick={handleClickPlus}>
					Следующая страница
				</button>
				
				<PaginationComponents/>
			</div>
			<ul>
				<li>
					<div className="productTitle">Название</div>
					<div className="productPrice">Цена</div>
					<div className="productBrand">Бренд</div>
					<div className="productId">Id</div>
				</li>
				{result.status === "loading" && <h2>Loading...</h2>}
				{result.status === "succeeded" && <ItemsList  />}
			</ul>
		</div>
	);
}

export default App;
