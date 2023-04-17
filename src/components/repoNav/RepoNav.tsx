import { FC } from 'react';
import { Breadcrumb } from 'antd';

import { GithubApi } from 'service/API';
import { capitalize } from 'helpers';
import style from './RepoNav.module.scss';

interface IProps {
	url: string;
}

const RepoNav: FC<IProps> = ({ url }) => {
	const baseUrl = 'https://github.com';

	const { owner, repoName } = GithubApi.parseRepoURI(url);

	const items = [
		{
			title: (
				<a target="_blank" rel="noreferrer" href={`${baseUrl}/${owner}`}>
					{capitalize(owner)}
				</a>
			),
		},
		{
			title: (
				<a
					target="_blank"
					rel="noreferrer"
					href={`${baseUrl}/${owner}/${repoName}`}
				>
					{capitalize(repoName)}
				</a>
			),
		},
	];

	return (
		<div className={style.nav}>
			<Breadcrumb separator=">" items={items}></Breadcrumb>
		</div>
	);
};

export default RepoNav;
