import { IIssue } from 'service/API/types';
import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IRepo {
	curRequest: string;
	issues: IIssue[];
}

export interface IRequest {
	curRequest: string;
	requestHistore: string[];
}
