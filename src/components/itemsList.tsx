
import { useAppSelector } from "../redux/store/useReduxHooks";

export const ItemsList = () => {

	const currentPerPage = useAppSelector(state => state.pagination.finalItems);

	// console.log(currentPerPage);

	return (
		<>
			{currentPerPage.map(item => (
				<li key={item.id}>
					<div className="productTitle">{item.product}</div>
					<div className="productPrice">{item.price}р.</div>
					<div className="productBrand">{item.brand ? item.brand : "-"}</div>
					<div className="productId">{item.id}</div>
				</li>
			))}
		</>
	);
};
