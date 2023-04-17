import { useSelector } from 'react-redux';
import { Empty, Result } from 'antd';

import style from './App.module.scss';
import Container from 'components/container';
import SearchBar from 'components/searchBar';
import RepoNav from 'components/repoNav';
import Board from 'components/board';
import { selectCurrentRepoUrl } from 'redux/boards/selectors.boards';
// import Test from 'components/test';

const App = () => {
	const curRequest = useSelector(selectCurrentRepoUrl);

	return (
		<section className={style.section}>
			<Container>
				<SearchBar />
				{curRequest && <RepoNav url={curRequest} />}
				{!curRequest && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
				{curRequest && <Board />}

				{/* {curRequest && (
					<Result
						status="404"
						title="404"
						subTitle={`${curRequest} is not exist`}
					/>
				)} */}
				{/* <Test /> */}
			</Container>
		</section>
	);
};

export default App;
