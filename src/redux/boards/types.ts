import { IIssue } from 'service/API/types';

export interface IConfig {
	title: string;
	items: IIssue[];
}

export interface IBoardsState {
	currentBoard: string;
	repos: {
		[name: string]: { [name: string]: IConfig };
	};
}
