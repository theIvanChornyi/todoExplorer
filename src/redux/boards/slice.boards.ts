import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBoardsState, IConfig, STATE_MACHINE } from './types';
import { fetchIssues } from './thunk.boards';

const initialState: IBoardsState = {
	currentBoard: '',
	repos: {},
	state: STATE_MACHINE.IDLE,
	error: { code: NaN, message: '' },
};

export const boardsSlice = createSlice({
	name: 'boards',
	initialState,

	reducers: {
		setCurrentBoard: (state, { payload }: PayloadAction<string>) => {
			state.currentBoard = payload;
		},

		closeBoard: state => {
			state.currentBoard = '';
			state.state = STATE_MACHINE.IDLE;
		},

		deleteBoard: (state, { payload }: PayloadAction<string>) => {
			Reflect.deleteProperty(state.repos, payload);
			state.currentBoard = '';
			state.state = STATE_MACHINE.IDLE;
		},

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
		builder.addCase(fetchIssues.pending, state => {
			state.state = STATE_MACHINE.LOADING;
			state.error = { code: NaN, message: '' };
			state.currentBoard = '';
		});
		builder.addCase(fetchIssues.fulfilled, (state, { payload }) => {
			if (payload) {
				state.repos = {
					...state.repos,
					[payload.request]: {
						ToDo: { title: 'ToDo', items: payload.data },
						'In Progress': {
							title: 'In Progress',
							items: [],
						},
						Done: { title: 'Done', items: [] },
					},
				};
				state.currentBoard = payload.request;
				state.state = STATE_MACHINE.RESOLVED;
			}
		});
		builder.addCase(fetchIssues.rejected, (state, { payload }) => {
			state.state = STATE_MACHINE.REJECTED;
			state.currentBoard = '';

			if (payload) {
				state.error = { code: payload.code, message: payload.message };
			}
		});
	},
});

export const {
	reorderInsideCol,
	reorderBetweenCol,
	setCurrentBoard,
	deleteBoard,
	closeBoard,
} = boardsSlice.actions;
export default boardsSlice.reducer;
