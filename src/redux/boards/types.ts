import { IIssue } from 'service/API/types';

export enum STATE_MACHINE {
	IDLE = 'idle',
	LOADING = 'loading',
	RESOLVED = 'resolved',
	REJECTED = 'rejected',
}

export interface IError {
	code: number;
	message: string;
}

export interface IConfig {
	title: string;
	items: IIssue[];
}

export interface IColumn {
	[name: string]: IConfig;
}

export interface IRepos {
	[name: string]: IColumn;
}

export interface IBoardsState {
	currentBoard: string;
	repos: IRepos;
	state: STATE_MACHINE;
	error: IError;
}

export interface AsyncThunkConfig {}
