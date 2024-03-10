export const getDate = () => {
	const year: string = "" + new Date().getFullYear();
	let month: string = new Date().getMonth() + 1 + "";
	let day: string = "" + new Date().getDate();

	if (month.length === 1) {
		month = "0" + month;
	}
	if (day.length === 1) {
		day = "0" + day;
	}
	`${year}${month}${day}`
	// return `${year}${month}${day}`;
	return "20240310";
};
