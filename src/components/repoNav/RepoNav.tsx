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
	return (
		<div className={style.nav}>
			<Breadcrumb
				separator=">"
				items={[
					{
						title: capitalize(owner),
						href: `${baseUrl}/${owner}`,
					},
					{
						title: capitalize(repoName),
						href: `${baseUrl}/${owner}/${repoName}`,
					},
				]}
			/>
		</div>
	);
};

export default RepoNav;
