import { setItems } from "../../redux/slice/itemsSlice/itemsSlice";
import {
	useAppDispatch,
	useAppSelector,
} from "../../redux/store/useReduxHooks";

export const HeaderItemList = () => {
	const items = useAppSelector(state => state.items.items);
	const dispatch = useAppDispatch();

	// const [filter,setFilter]= useState(false)

	function handleClickSortPriceDown() {
		const arr = [...items];
		arr.sort((a, b) => a.price - b.price);

		dispatch(setItems(arr));
	}
	function handleClickSortPriceUp() {
		const arr = [...items];
		arr.sort((a, b) => b.price - a.price);

		dispatch(setItems(arr));
	}

	function handleClickSortNumDown() {
		const arr = [...items];
		arr.sort((a, b) => a.number - b.number);

		dispatch(setItems(arr));
	}
	function handleClickSortNumUp() {
		const arr = [...items];
		arr.sort((a, b) => b.number - a.number);

		dispatch(setItems(arr));
	}

	return (
		<li>
			<div className="productNumber">
				<div className="cursorPointer" onClick={handleClickSortNumDown}>
					▼
				</div>
				№
				<div className="cursorPointer" onClick={handleClickSortNumUp}>
					▲
				</div>
			</div>
			<div className="productTitle">Название</div>
			<div className="productPrice">
				<div className="cursorPointer" onClick={handleClickSortPriceDown}>
					▼
				</div>
				Цена
				<div className="cursorPointer" onClick={handleClickSortPriceUp}>
					▲
				</div>
			</div>
			<div className="productBrand">Бренд</div>
			<div className="productId">Id</div>
		</li>
	);
};
