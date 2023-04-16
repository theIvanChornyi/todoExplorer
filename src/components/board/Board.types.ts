import { IIssue } from 'service/API/types';

export interface IBoard {
	boadrId: string;
	title: string;
	items: IIssue[];
}
export type BoardsType = IBoard[];
