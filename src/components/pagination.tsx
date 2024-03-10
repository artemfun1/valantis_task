import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useToggleDisable } from "../hooks/useToggleDisable";
import { fetchItems } from "../redux/slice/itemsSlice/fetchItems";
import { FetchDataType, setOffset } from "../redux/slice/itemsSlice/itemsSlice";
import {
	setActualPageNumbers,
	setCurrentPage,
	setCurrentPageNext,
	setCurrentPagePrev,
	setIntervals,
	setPageNumbers,
	setPagination,
} from "../redux/slice/paginationSlice/paginationSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/useReduxHooks";

export const PaginationComponents = () => {
	const dispatch = useAppDispatch();
	const paginationState = useAppSelector(state => state.pagination);
	const totalItems = useAppSelector(state => state.items.items);
	const offset = useAppSelector(state => state.items.fetchData.params.offset);
	const fetchData = useAppSelector(state => state.items.fetchData);
	const itemsPerPage = useAppSelector(
		state => state.pagination.elementsPerPages
	);
	const intervalMin = useAppSelector(
		state => state.pagination.intervals.intervalMin
	);
	const intervalMax = useAppSelector(
		state => state.pagination.intervals.intervalMax
	);
	const result = useAppSelector(state => state.items);

	const lastIndex =
		paginationState.currentPage * paginationState.elementsPerPages;
	const firstIndex = lastIndex - paginationState.elementsPerPages;
	const divRefPagination = useRef<HTMLDivElement>(null);
	const paginationDivRef = useRef<HTMLDivElement>(null);

	useToggleDisable({ paginationDivRef });

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
		// const tens = Math.floor(pageNumbers.length / 10); //
		// const intervalMin = +(tens + "0");
		// const intervalMax = +(tens + "0") + 10;

		// dispatch(setIntervals({ intervalMin, intervalMax }));
		// console.log(pageNumbers.length)
		// console.log(fetchData)

		if (
			paginationState.currentPage.toString()[
				paginationState.currentPage.toString().length - 1
			] !== "0"
		) {
			const currentPageIntervalNum = Math.floor(
				paginationState.currentPage / 10
			); //1
			const intervalMinCurrentPage = +(currentPageIntervalNum + "0"); //10
			const intervalMaxCurrentPage = +(currentPageIntervalNum + "0") + 10; //10
			const arrCurrentPageNumbers = pageNumbers.slice(
				intervalMinCurrentPage,
				intervalMaxCurrentPage
			);
			dispatch(setActualPageNumbers(arrCurrentPageNumbers));
		}

		dispatch(setPageNumbers(pageNumbers));
	}, [dispatch, totalItems, itemsPerPage, paginationState.currentPage]);

	function handleClick(pageNumber: number) {
		dispatch(setCurrentPage(pageNumber));

		if (
			pageNumber ===
				paginationState.pageNumbers[paginationState.pageNumbers.length - 1] &&
			fetchData.action !== "filter"
		) {
			if (typeof offset === "number") {
				dispatch(setOffset(offset! + paginationState.elementsPerPages));

				const newFetchData: FetchDataType = {
					action: fetchData.action,
					params: {
						...fetchData.params,
						offset: fetchData.params.offset! + paginationState.elementsPerPages,
					},
				};

				dispatch(fetchItems(newFetchData));
			}
		}
	}

	function handleClickNext() {
		const min = intervalMin + 10;
		const max = intervalMax + 10;
		const arr = paginationState.pageNumbers.slice(min, max);
		dispatch(
			setIntervals({
				intervalMin: min,
				intervalMax: max,
			})
		);
		dispatch(setActualPageNumbers(arr));
		dispatch(setCurrentPage(arr[0]));
	}

	function handleClickPrev() {
		const min = intervalMin - 10;
		const max = intervalMax - 10;
		const arr = paginationState.pageNumbers.slice(min, max);

		dispatch(
			setIntervals({
				intervalMin: min,
				intervalMax: max,
			})
		);
		dispatch(setActualPageNumbers(arr));
		dispatch(setCurrentPage(arr[0]));
	}

	function handleClickNextPage() {
		if (
			!(
				paginationState.currentPage ===
				paginationState.pageNumbers[paginationState.pageNumbers.length - 1]
			)
		) {
			dispatch(setCurrentPageNext(1));
		}

		if (
			paginationState.currentPage ===
				paginationState.pageNumbers[paginationState.pageNumbers.length - 2] &&
			fetchData.action !== "filter"
		) {
			if (typeof offset === "number") {
				dispatch(setOffset(offset! + paginationState.elementsPerPages));

				const newFetchData: FetchDataType = {
					action: fetchData.action,
					params: {
						...fetchData.params,
						offset: fetchData.params.offset! + paginationState.elementsPerPages,
					},
				};

				dispatch(fetchItems(newFetchData));
			}
		}

		if (
			paginationState.currentPage ===
				paginationState.actualPageNumbers[
					paginationState.actualPageNumbers.length - 1
				] &&
			fetchData.action !== "filter"
		) {
			const min = intervalMin + 10;
			const max = intervalMax + 10;

			const arr = paginationState.pageNumbers.slice(min, max);
			dispatch(
				setIntervals({
					intervalMin: min,
					intervalMax: max,
				})
			);
			dispatch(setActualPageNumbers(arr));
			dispatch(setCurrentPage(arr[0]));
		}
	}

	function handleClickPrevPage() {
		dispatch(setCurrentPagePrev(1));

		if (paginationState.currentPage === 1) {
			return;
		}

		if (paginationState.currentPage === paginationState.actualPageNumbers[0]) {
			const min = intervalMin - 10;
			const max = intervalMax - 10;

			const arr = paginationState.pageNumbers.slice(min, max);
			dispatch(
				setIntervals({
					intervalMin: min,
					intervalMax: max,
				})
			);
			dispatch(setActualPageNumbers(arr));
			dispatch(setCurrentPage(arr[arr.length - 1]));
		}
	}

	return (
		<div
			ref={paginationDivRef}
			className={clsx(
				"paginationBlock",
				result.status === "loading" ? "disabledDiv" : ""
			)}
		>
			<button onClick={handleClickPrevPage}>Prev Page</button>

			<button
				className={clsx(
					!(
						paginationState.actualPageNumbers.length &&
						paginationState.actualPageNumbers[0] !== 1
					) && "hidden"
				)}
				onClick={handleClickPrev}
			>
				{"<..."}
			</button>

			<div ref={divRefPagination} className="paginationNumbersPages">
				{paginationState.actualPageNumbers.map(num => (
					<div
						className={clsx(
							"pageNumber",
							paginationState.currentPage === num ? "clicked" : ""
						)}
						onClick={() => handleClick(num)}
						key={num}
					>
						{num}
					</div>
				))}
			</div>

			<button
				className={clsx(
					!(
						paginationState.pageNumbers[
							paginationState.pageNumbers.length - 1
						] >
						paginationState.actualPageNumbers[
							paginationState.actualPageNumbers.length - 1
						]
					) && "hidden"
				)}
				onClick={handleClickNext}
			>
				{"...>"}
			</button>

			<button onClick={handleClickNextPage}>Next Page</button>
		</div>
	);
};
