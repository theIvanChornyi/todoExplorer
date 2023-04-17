import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/types';

export const selectCurrentRepoUrl = (state: RootState) =>
	state.boards.currentBoard;

export const selectBoards = (state: RootState) => state.boards.repos;

export const selectCurrentBoard = createSelector(
	[selectBoards, selectCurrentRepoUrl],
	(boards, repoUri) => boards[repoUri]
);
