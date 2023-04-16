export interface IRepoURI {
	owner: string;
	repoName: string;
}

export interface IUser {
	id: number;
	type: string;
}

export interface IIssue {
	id: number;
	title: string;
	created_at: string;
	comments: number;
	user: IUser;
}
