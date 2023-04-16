import { ICards, IColumns } from './types';

const cards: ICards = {
	'card-1': { id: 'card-1', title: 'a' },
	'card-2': { id: 'card-2', title: 'b' },
	'card-3': { id: 'card-3', title: 'c' },
	'card-4': { id: 'card-4', title: 'd' },
	'card-5': { id: 'card-5', title: 'e' },
	'card-6': { id: 'card-6', title: 'f' },
};

const columns: IColumns = {
	'col-1': {
		id: 'col-1',
		title: 'ToDo',
		cardsId: ['card-1', 'card-2'],
	},
	'col-2': {
		id: 'col-2',
		title: 'Working',
		cardsId: ['card-3', 'card-4', 'card-5', 'card-6'],
	},
	'col-3': {
		id: 'col-3',
		title: 'Done',
		cardsId: [],
	},
};
const columnOrder = ['col-1', 'col-2', 'col-3'];

export const init = { cards, columns, columnOrder };
