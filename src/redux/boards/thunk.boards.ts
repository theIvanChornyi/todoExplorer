import { createAsyncThunk } from '@reduxjs/toolkit';
import { GithubApi } from 'service/API';
const github = new GithubApi();

export const getIssues = createAsyncThunk(
	'boards/getIssues',
	async (request: string, thunkAPI) => {
		try {
			const data = await github.getTodos(GithubApi.parseRepoURI(request));
			return { data, request };
		} catch (e) {
			if (e instanceof Error) {
				thunkAPI.rejectWithValue(e.message);
			}
		}
	}
);
