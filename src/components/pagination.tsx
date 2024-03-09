import { useEffect } from 'react'
import { Items} from "../redux/slice/itemsSlice/itemsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/useReduxHooks";
import { Pagination, setPagination } from '../redux/slice/paginationSlice/paginationSlice'

export const PaginationComponents = () => {
	const dispatch = useAppDispatch();
	const statePagination = useAppSelector(state => state.pagination);
	const stateItems = useAppSelector(state => state.items);

	const lastIndex=statePagination.currentPage*statePagination.elementsPerPages
	const firstIndex=lastIndex-statePagination.elementsPerPages
	const currentItemsPage:Items = stateItems.items.slice(firstIndex,lastIndex)

const objPagination:Pagination ={
		currentPage: statePagination.currentPage,
		lastIndex:lastIndex,
		firstIndex:firstIndex,
		elementsPerPages: statePagination.elementsPerPages,
		currentItemsPage:[...currentItemsPage]
	}

	
	useEffect(()=>{
	dispatch(setPagination(objPagination))
	},[objPagination])
	

	

	// const arrPages: string[] = [];
	// for (let i = 0; i < state.pagination.elementsPerPages; i++) {
	// 	arrPages.push("");
	// }



	return (
		<div className="paginationNumbersPages">
			...

      {}
			{/* {arrPages.map((_, i) => (
				<div className="pageNumber" onClick={() => handleClick(i + 1)} key={i}>
					{i + 1}
				</div>
			))} */}
			...
		</div>
	);
};
