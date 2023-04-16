import { RootState } from 'redux/types';
import { repoAdapter } from './slice.repo';

const repoSelectors = repoAdapter.getSelectors(
	(state: RootState) => state.repoReducer
);
export const getAllIssue = repoSelectors.selectAll;
export const selectedCurRequest = (state: RootState) =>
	state.repoReducer.curRequest;
