import { useAppSelector } from "../../redux/store/useReduxHooks";
import { HeaderItemList } from "./HeaderItemList";
import { ItemsInItemList } from "./ItemsInItemList";
import "./itemLoad.css";

export const ItemsList = () => {
	const result = useAppSelector(state => state.items);

	// function decodeUUID(uuid: string) {
	// 	const bytes = new Uint8Array(10);
	// 	for (let i = 0; i < 10; i++) {
	// 		bytes[i] = parseInt(uuid.substring(i * 2, i * 2 + 2), 16);
	// 	}

	// 	let decoded = 0;
	// 	bytes.forEach(byte => {
	// 		decoded += byte;
	// 	});

	// 	return decoded; // 1419
	// }
	// const decodedUUID = decodeUUID("1789ecf3-f81c-4f49-ada2-83804dcc74b0");
	// console.log(decodedUUID);

	return (
		<ul>
			<HeaderItemList />
			{result.status === "loading" && (
				<div className="center">
					<div className="ring"></div>
					<span>Loading</span>
				</div>
			)}

			{result.error && result.status === "loading" && (
				<>
					<h2>
						Произошла ошибка :( <br /> повторное получение данных...
					</h2>
					<span className="lol">Во всем виноват разработчик сервера</span>
					<h2>Ошибка :{result.error}</h2>
				</>
			)}

			{result.status === "succeeded" && <ItemsInItemList />}
		</ul>
	);
};
