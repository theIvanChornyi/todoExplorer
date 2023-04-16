export interface ICard {
	id: string;
	title: string;
}

export interface ICards {
	[id: string]: ICard;
}

export interface IColumn {
	id: string;
	title: string;
	cardsId: string[];
}
export interface IColumns {
	[id: string]: IColumn;
}
export interface IConfig {
	cards: ICards;
	columns: IColumns;
	columnOrder: string[];
}
