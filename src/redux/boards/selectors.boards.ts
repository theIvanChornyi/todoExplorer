import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/types';

export const selectCurrentRepoUrl = (state: RootState) =>
	state.boards.currentBoard;

export const selectBoards = (state: RootState) => state.boards.repos;

export const selectCurrentBoard = createSelector(
	[selectBoards, selectCurrentRepoUrl],
	(boards, repoUri) => {
		return boards[repoUri];
	}
);

export const selectHasInHistory = createSelector(
	[selectCurrentRepoUrl, selectBoards],
	(request, boards) => request in boards
);

export const selectState = (state: RootState) => state.boards.state;

export const selectError = (state: RootState) => state.boards.error;
