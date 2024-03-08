import { setCurrentPage } from "../redux/slice/itemsSlice/itemsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/useReduxHooks";

export const Pagination = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(state => state.items);

	const arrPages: string[] = [];
	for (let i = 0; i < state.totalPages; i++) {
		arrPages.push("");
	}

	function handleClick(num: number) {
		dispatch(setCurrentPage(num));
	}

	return (
		<div className="paginationNumbersPages">
			...

      {}
			{arrPages.map((_, i) => (
				<div className="pageNumber" onClick={() => handleClick(i + 1)} key={i}>
					{i + 1}
				</div>
			))}
			...
		</div>
	);
};
