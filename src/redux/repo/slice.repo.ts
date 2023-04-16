import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getIssues } from './thunk.repo';
import { IIssue } from 'service/API/types';
import { IRequest } from 'redux/types';

export const repoAdapter = createEntityAdapter<IIssue>({
	selectId: issues => issues.id,
});

const initialState = repoAdapter.getInitialState<IRequest>({
	curRequest: '',
	requestHistore: [],
});

export const repoSlice = createSlice({
	name: 'userRequest',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getIssues.pending, (state, action) => {});
		builder.addCase(getIssues.fulfilled, (state, { payload }) => {
			if (payload) {
				state.curRequest = payload.request;
				state.requestHistore.push(payload.request);
				repoAdapter.setAll(state, payload.data);
			}
		});
		builder.addCase(getIssues.rejected, (state, action) => {});
	},
});

// export const {} = repoSlice.actions;
export default repoSlice.reducer;
