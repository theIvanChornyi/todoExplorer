import { useSelector } from 'react-redux';
import { Empty, Result } from 'antd';

import style from './App.module.scss';
import Container from 'components/container';
import SearchBar from 'components/searchBar';
import RepoControls from 'components/repoControls';
import Board from 'components/board';
import {
	selectCurrentRepoUrl,
	selectError,
	selectState,
} from 'redux/boards/selectors.boards';
import { STATE_MACHINE } from 'redux/boards/types';

const App = () => {
	const curRepo = useSelector(selectCurrentRepoUrl);
	const curError = useSelector(selectError);
	const curState = useSelector(selectState);

	return (
		<section className={style.section}>
			<Container>
				<SearchBar />
				{curRepo && (
					<>
						<RepoControls url={curRepo} />
						<Board />
					</>
				)}

				{curState === STATE_MACHINE.IDLE && (
					<h1 className={`${style.title} + " demo-tbody"`}>
						Use GitHub repo link
					</h1>
				)}

				{curError.code === 400 && (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				)}
				{curError.code === 404 && (
					<Result status="404" title="404" subTitle={'Wrong repo URL'} />
				)}
			</Container>
		</section>
	);
};

export default App;
