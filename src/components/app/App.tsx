import { useSelector } from 'react-redux';
import { Empty } from 'antd';

import { getAllIssue, selectedCurRequest } from 'redux/repo/selectors.repo';
import style from './App.module.scss';
import Container from 'components/container';
import SearchBar from 'components/searchBar';
import RepoNav from 'components/repoNav';
import Board from 'components/board';
// import Test from 'components/test';

const App = () => {
	const curRequest = useSelector(selectedCurRequest);
	const issues = useSelector(getAllIssue);
	return (
		<section className={style.section}>
			<Container>
				<SearchBar />
				{issues.length > 0 && <RepoNav url={curRequest} />}
				{!(issues.length > 0) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
				{issues.length > 0 && <Board />}

				{/* <Test /> */}
			</Container>
		</section>
	);
};

export default App;
