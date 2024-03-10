import { useAppSelector } from "../../redux/store/useReduxHooks";

export const ItemsInItemList = () => {
	const currentPerPage = useAppSelector(state => state.pagination.finalItems);

	function getId(string: string, num: number) {
		const id = parseInt(string, num)
			.toString()
			.replace(/.{3}/g, match => match + " ");
		return id;
	}

	return (
		<>
			{currentPerPage.length === 0 && <h1>Ничего не нашлось :(</h1>}
			{currentPerPage.map(item => (
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
