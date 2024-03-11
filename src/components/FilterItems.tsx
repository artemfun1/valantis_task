import { useState } from "react";
import { fetchItems } from "../redux/slice/itemsSlice/fetchItems";
import {
	FetchDataType,
	clearItems,
	setFetchData,
} from "../redux/slice/itemsSlice/itemsSlice";
import { setCurrentPage } from "../redux/slice/paginationSlice/paginationSlice";
import { useAppDispatch } from "../redux/store/useReduxHooks";

export const FilterItems = () => {
	const [name, SetName] = useState("");
	const [price, setPrice] = useState("");
	const [brand, setBrand] = useState("");

	const dispatch = useAppDispatch();

	// console.log(name)
	// console.log(price)
	// console.log(brand)
	function handlerChangeName(e: React.ChangeEvent<HTMLInputElement>) {
		SetName(e.target.value);
	}
	function handlerChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
		setPrice(e.target.value);
	}

	function handlerChangeBrand(e: React.ChangeEvent<HTMLInputElement>) {
		setBrand(e.target.value);
	}

	// filter - используется для фильтрации. Возвращает упорядоченный список идентификаторов товаров, соответствующих заданному значению.
	// Параметры:
	// В качестве параметра может использоваться любое поле возвращаемое методом get_fields без параметров. В качестве значения должен использоваться тип данных соответствующий полю. Для поля product будет проверяться вхождение параметра в строку. Для остальных полей проверяется строгое соответствие.
	// Пример запроса:
	// {
	//   "action": "filter",
	//   "params": {"price": 17500.0}
	// }

	function handlerClickName(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		console.log(name);
		SetName("");
		const newFetchData: FetchDataType = {
			action: "filter",
			params: {
				product: `${name}`,
			},
		};
		if (name.length === 0) {
			alert("Пустое нельзя :D");
		} else {
			dispatch(clearItems());
			dispatch(setCurrentPage(1));
			dispatch(setFetchData(newFetchData));
			dispatch(fetchItems(newFetchData));
		}
	}
	function handlerClickPrice(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		console.log(price);
		setPrice("");

		const newFetchData: FetchDataType = {
			action: "filter",
			params: {
				price: +price,
			},
		};
		if (price.length === 0) {
			alert("Пустое нельзя :D");
		} else {
			dispatch(clearItems());
			dispatch(setCurrentPage(1));
			dispatch(setFetchData(newFetchData));
			dispatch(fetchItems(newFetchData));
		}
	}

	function handlerClickBrand(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		console.log(brand);
		setBrand("");
		const newFetchData: FetchDataType = {
			action: "filter",
			params: {
				brand: brand,
			},
		};
		if (brand.length === 0) {
			alert("Пустое нельзя :D");
		} else {
			dispatch(clearItems());
			dispatch(setCurrentPage(1));
			dispatch(setFetchData(newFetchData));
			dispatch(fetchItems(newFetchData));
		}
	}

	return (
		<div className="filterComp">
			<form>
				<input
					onChange={e => handlerChangeName(e)}
					type="text"
					name=""
					id=""
					placeholder="Поиск по имени"
					value={name}
				/>{" "}
				<button onClick={e => handlerClickName(e)}> Найти </button>
			</form>

			<form>
				<input
					onChange={e => handlerChangePrice(e)}
					type="number"
					name=""
					id=""
					placeholder="Поиск по точной цене"
					value={price}
				/>{" "}
				<button onClick={e => handlerClickPrice(e)}> Найти </button>
			</form>
			<form>
				<input
					onChange={e => handlerChangeBrand(e)}
					type="text"
					name=""
					id=""
					placeholder="По точному бренду"
					value={brand}
				/>{" "}
				<button onClick={e => handlerClickBrand(e)}> Найти </button>
			</form>
		</div>
	);
};
