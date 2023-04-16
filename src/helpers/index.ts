export const capitalize = (string: string): string => {
	return string ? string.replace(/\w/, string[0].toLocaleUpperCase()) : '';
};

export const cooldownDate = (date: string): string => {
	const now = new Date();
	const created = new Date(date);

	const diffInDays = Math.floor(
		(now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
	);
	return diffInDays > 0 ? `${diffInDays} days ago` : 'today';
};
