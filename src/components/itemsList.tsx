import { useAppSelector } from "../redux/store/useReduxHooks";

export const ItemsList = () => {
	const result = useAppSelector(state => state.items);

  console.log(result.items.length)
  


	return (
		<>
			{result.items.map(item => (
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
