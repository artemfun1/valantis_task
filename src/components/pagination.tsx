import clsx from "clsx";
import { useEffect } from "react";
import { fetchItems } from "../redux/slice/itemsSlice/fetchItems";
import { setOffset } from "../redux/slice/itemsSlice/itemsSlice";
import {
	setCurrentPage,
	setPageNumbers,
	setPagination,
} from "../redux/slice/paginationSlice/paginationSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/useReduxHooks";

export const PaginationComponents = () => {
	const dispatch = useAppDispatch();
	const paginationState = useAppSelector(state => state.pagination);
	const totalItems = useAppSelector(state => state.items.items);
	const offset = useAppSelector(state => state.items.offset);
	const itemsPerPage = useAppSelector(
		state => state.pagination.elementsPerPages
	);

	const lastIndex =
		paginationState.currentPage * paginationState.elementsPerPages;
	const firstIndex = lastIndex - paginationState.elementsPerPages;

	useEffect(() => {
		const finalItems = totalItems.slice(firstIndex, lastIndex);
		const objPagination = {
			lastIndex: lastIndex,
			firstIndex: firstIndex,
			finalItems: finalItems,
		};

		dispatch(setPagination(objPagination));
	}, [dispatch, firstIndex, lastIndex, totalItems]);

	useEffect(() => {
		const pageNumbers: number[] = [];

		for (let i = 1; i <= Math.ceil(totalItems.length / itemsPerPage); i++) {
			pageNumbers.push(i);
		}
		dispatch(setPageNumbers(pageNumbers));
	}, [dispatch, totalItems, itemsPerPage]);

	function handleClick(pageNumber: number) {
		dispatch(setCurrentPage(pageNumber));

		if (
			pageNumber ===
			paginationState.pageNumbers[paginationState.pageNumbers.length - 1]
		) {
			dispatch(fetchItems(200));
			dispatch(setOffset(offset + 200));
		}
	}

	return (
		<div className="paginationNumbersPages">
			{paginationState.pageNumbers.map((_, i) => (
				<div
					className={clsx(
						"pageNumber",
						paginationState.currentPage === i + 1 ? "clicked" : ""
					)}
					onClick={() => handleClick(i + 1)}
					key={i}
				>
					{i + 1}
				</div>
			))}
		</div>
	);
};
