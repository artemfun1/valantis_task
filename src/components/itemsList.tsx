import { useAppSelector } from "../redux/store/useReduxHooks";


export const ItemsList = () => {
	const currentPerPage = useAppSelector(state => state.pagination.finalItems);

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

	function getId(string:string,num:number){
		const id = parseInt(string, num).toString().replace( /.{3}/g, (match) => match + " ")
		return id
	}

	return (
		<>
			{currentPerPage.map((item) => (
				<li key={item.id}>
					<div className="productNumber">{item.number}</div>
					<div className="productTitle">{item.product}</div>
					<div className="productPrice">{item.price}р.</div>
					<div className="productBrand">{item.brand ? item.brand : "-"}</div>
					<div className="productId">{getId(item.id, 16)}</div>
				</li>
			))}
		</>
	);
};
