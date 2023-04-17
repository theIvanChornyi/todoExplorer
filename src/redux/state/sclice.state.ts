import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IState, STATE_MACHINE } from './types';

const initialState: IState = {
	state: STATE_MACHINE.IDLE,
	error: { code: NaN, message: '' },
	currentRequest: '',
};

export const stateSlice = createSlice({
	name: 'state',
	initialState,
	reducers: {
		requestState: (state, { payload }: PayloadAction<STATE_MACHINE>) => {
			state.state = payload;
		},
		setCurrentRequestURL: (state, { payload }: PayloadAction<string>) => {
			state.currentRequest = payload;
		},
	},
});

export const { requestState } = stateSlice.actions;
export default stateSlice.reducer;
