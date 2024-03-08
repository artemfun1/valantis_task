import { useAppSelector } from "../redux/store/useReduxHooks";

type Props = {
	btnPastRef: React.RefObject<HTMLButtonElement>;
	btnNextRef: React.RefObject<HTMLButtonElement>;
};

export const useToggleDisableBtn = ({ btnPastRef, btnNextRef }: Props) => {
	const result = useAppSelector(state => state.items);

	if (
		(result.status === "loading" || result.status === "failed") &&
		btnPastRef.current &&
		btnNextRef.current
	) {
		btnPastRef.current.setAttribute("disabled", "disabled");
		btnNextRef.current.setAttribute("disabled", "disabled");
	} else if (
		result.status === "succeeded" &&
		btnPastRef.current &&
		btnNextRef.current
	) {
		btnPastRef.current.removeAttribute("disabled");
		btnNextRef.current.removeAttribute("disabled");
	}
};
