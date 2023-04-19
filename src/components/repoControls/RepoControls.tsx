import { FC } from 'react';
import { Breadcrumb, Button, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';

import { GithubApi } from 'service/API';
import { capitalize } from 'helpers';
import style from './RepoControls.module.scss';
import { closeBoard, deleteBoard } from 'redux/boards/slice.boards';

interface IProps {
	url: string;
}

const RepoControls: FC<IProps> = ({ url }) => {
	const dispatch = useDispatch();
	const { owner, repoName } = GithubApi.parseRepoURI(url);

	const onHandleClose = () => {
		dispatch(closeBoard());
	};

	const handleDelete = () => {
		dispatch(deleteBoard(url));
	};

	const createLink = (title: string, link: string) => {
		const baseUrl = 'https://github.com';
		return (
			<a target="_blank" rel="noreferrer" href={`${baseUrl}/${link}`}>
				{capitalize(title)}
			</a>
		);
	};

	const items = [
		{
			title: createLink(owner, `${owner}`),
		},
		{
			title: createLink(repoName, `${owner}/${repoName}`),
		},
	];

	return (
		<div className={style.controls}>
			<Breadcrumb separator=">" items={items}></Breadcrumb>
			<div className={style.buttons}>
				<Popconfirm
					title="Delete this repo from history"
					description="Are you sure to delete this repo from history?"
					onConfirm={handleDelete}
					okText="Yes"
					cancelText="No"
				>
					<Button type="primary">Delete</Button>
				</Popconfirm>
				<Popconfirm
					title="Close these issues"
					description="Are you sure to close these issues?"
					onConfirm={onHandleClose}
					okText="Yes"
					cancelText="No"
				>
					<Button type="primary">Close</Button>
				</Popconfirm>
			</div>
		</div>
	);
};

export default RepoControls;
