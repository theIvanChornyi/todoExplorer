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

export interface IState {
	state: STATE_MACHINE;
	error: IError;
	currentRequest: string;
}
