import { useAppSelector } from "../redux/store/useReduxHooks";

type Props = {
	paginationDivRef: React.RefObject<HTMLDivElement>;
};

export const useToggleDisable = ({ paginationDivRef }: Props) => {
	const result = useAppSelector(state => state.items);

	if (
		(result.status === "loading" || result.status === "failed") &&
		paginationDivRef.current
	) {
		paginationDivRef.current.setAttribute("disabled", "disabled");
	} else if (result.status === "succeeded" && paginationDivRef.current) {
		paginationDivRef.current.removeAttribute("disabled");
	}
};
