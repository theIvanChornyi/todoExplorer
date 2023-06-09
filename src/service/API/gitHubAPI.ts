import axios from 'axios';
import { IRepoURI, IResponse } from './types';

export class GithubApi {
	private static _instanse: GithubApi;
	private _baseUrl = 'https://api.github.com/repos';

	public static parseRepoURI = (url: string): IRepoURI => {
		const [owner, repoName] = url.replace('https://github.com/', '').split('/');
		return { owner, repoName };
	};

	constructor() {
		if (!GithubApi._instanse) {
			GithubApi._instanse = this;
		}
		axios.defaults.baseURL = this._baseUrl;
		return GithubApi._instanse;
	}

	public getIssues = async (req: IRepoURI): Promise<IResponse[]> => {
		const { owner, repoName } = req;
		const { data, status } = await axios({
			method: 'get',
			url: `${owner}/${repoName}/issues`,
			params: {
				state: 'open',
				per_page: 10,
			},
		});
		return Object.assign(data, status);
	};
}
