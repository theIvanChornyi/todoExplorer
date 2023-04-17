import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBoardsState, IConfig } from './types';
import { getIssues } from './thunk.boards';

const initialState: IBoardsState = {
	currentBoard: '',
	repos: {},
};

export const boardsSlice = createSlice({
	name: 'boards',
	initialState,

	reducers: {
		reorderInsideCol: (state, { payload }: PayloadAction<IConfig>) => {
			state.repos[state.currentBoard][payload.title].items = payload.items;
		},

		reorderBetweenCol: (state, { payload }: PayloadAction<IConfig[]>) => {
			const [sourse, destination] = payload;
			state.repos[state.currentBoard][sourse.title].items = sourse.items;
			state.repos[state.currentBoard][destination.title].items =
				destination.items;
		},
	},

	extraReducers: builder => {
		builder.addCase(getIssues.pending, (state, action) => {});
		builder.addCase(getIssues.fulfilled, (state, { payload }) => {
			if (payload) {
				state.currentBoard = payload.request;
				state.repos = {
					...state.repos,
					[payload.request]: {
						ToDo: { title: 'ToDo', items: payload.data },
						'In Progress': { title: 'In Progress', items: [] },
						Done: { title: 'Done', items: [] },
					},
				};
			}
		});
		builder.addCase(getIssues.rejected, (state, action) => {});
	},
});

export const { reorderInsideCol, reorderBetweenCol } = boardsSlice.actions;
export default boardsSlice.reducer;
