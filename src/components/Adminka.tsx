import { useState } from "react";
import { fetchItems } from "../redux/slice/itemsSlice/fetchItems";
import {
	FetchDataType,
	clearItems,
	setFetchData,
} from "../redux/slice/itemsSlice/itemsSlice";
import {
	setCurrentPage,
	setElementsPerPages,
} from "../redux/slice/paginationSlice/paginationSlice";
import { useAppDispatch } from "../redux/store/useReduxHooks";
import { Svg } from "./Svg";

export const Adminka = () => {
	const [hidden, setHidden] = useState(false);
	const [num, setNum] = useState("50");
	const [searchNum, setSearchNum] = useState("99");

	const dispatch = useAppDispatch();

	function handlerChangeNum(e: React.ChangeEvent<HTMLInputElement>) {
		setNum(e.target.value);
	}

	function handlerChangeSearchNum(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchNum(e.target.value);
	}

	function handlerClickStandart(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		const newFetchData: FetchDataType = {
			action: "get_ids",
			params: { offset: 0, limit: 99 },
		};

		dispatch(clearItems());
		dispatch(setCurrentPage(1));
		dispatch(setFetchData(newFetchData));
		dispatch(fetchItems(newFetchData));
	}

	function handlerClickNum(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		setNum("");
		dispatch(setElementsPerPages(+num));

		dispatch(setCurrentPage(1));
	}

	function handlerClickSearchNum(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setSearchNum("");

		const newFetchData: FetchDataType = {
			action: "get_ids",
			params: { offset: 0, limit: +searchNum },
		};
		dispatch(clearItems());
		dispatch(setCurrentPage(1));
		dispatch(setFetchData(newFetchData));
		dispatch(fetchItems(newFetchData));
	}

	return (
		<>
			<button className="btnAdmin" onClick={() => setHidden(!hidden)}>
				Открыть/закрыть Админку
			</button>

			<Svg />
			{hidden && (
				<div className="adminka">
					<form>
						<button onClick={e => handlerClickStandart(e)}>
							{" "}
							Сделать стандартный запрос{" "}
						</button>{" "}
						- как при первом запуске сайта, получение просто всех предметов
					</form>

					<form>
						{`Сейчас: ${num} `}
						<input
							onChange={e => handlerChangeNum(e)}
							type="number"
							name=""
							id=""
							placeholder="сколько на странице"
						/>{" "}
						<button onClick={e => handlerClickNum(e)}> Установить </button> -
						сколько товаров показывать на странице
					</form>
					<form>
						{`Сейчас: ${searchNum} `}
						<input
							onChange={e => handlerChangeSearchNum(e)}
							type="number"
							name=""
							id=""
							placeholder="сколько за раз"
						/>{" "}
						<button onClick={e => handlerClickSearchNum(e)}>
							{" "}
							Установить{" "}
						</button>{" "}
						- сколько товаров загружать за раз
					</form>
				</div>
			)}
		</>
	);
};
