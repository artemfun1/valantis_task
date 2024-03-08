import { useEffect, useRef } from "react";
import "./App.css";
import { ItemsList } from "./components/itemsList";
import { useToggleDisableBtn } from "./hooks/useToggleDisableBtn";
import { fetchItems } from "./redux/slice/itemsSlice/fetchItems";
import { useAppDispatch, useAppSelector } from "./redux/store/useReduxHooks";
import { Pagination } from './components/pagination'

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
	const btnPastRef = useRef<HTMLButtonElement>(null);
	const btnNextRef = useRef<HTMLButtonElement>(null);
	useToggleDisableBtn({ btnPastRef, btnNextRef });

	return (
		<div>
			<button> Название </button>
			<button> Цена </button>
			<button> Бренд </button> <br />
			
			<div className='pagination'>
				<button ref={btnPastRef} onClick={handleClickMinus}>
					Предыдущая страница
				</button>
				<Pagination/>
				<button ref={btnNextRef} onClick={handleClickPlus}>
					Следующая страница
				</button>
			</div>
			<ul>
				<li>
					<div className="productTitle">Название</div>
					<div className="productPrice">Цена</div>
					<div className="productBrand">Бренд</div>
					<div className="productId">Id</div>
				</li>
				{result.status === "loading" && <div>Loading...</div>}
				{result.status === "succeeded" && <ItemsList  />}
			</ul>
		</div>
	);
}

export default App;
