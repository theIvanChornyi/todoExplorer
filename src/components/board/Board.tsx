import { Col, Row } from 'antd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import style from './Board.module.scss';
import { selectCurrentBoard } from 'redux/boards/selectors.boards';
import { useDnD } from 'hooks/DnD.hook';
import IssueCard from 'components/issueCard/IssueCard';

const Board = () => {
	const boards = useSelector(selectCurrentBoard);
	const { onDragEnd } = useDnD(boards);

	return (
		<Row justify="space-between" align="stretch" gutter={16}>
			<DragDropContext onDragEnd={onDragEnd}>
				{boards &&
					Object.keys(boards).map(key => {
						const { title, items } = boards[key];
						return (
							<Col span={8} key={title}>
								<h2 className={style.column__title}>{title}</h2>
								<Droppable droppableId={title}>
									{provided => (
										<ul
											className={style.column__list}
											ref={provided.innerRef}
											{...provided.droppableProps}
										>
											{<IssueCard items={items} />}
											{provided.placeholder}
										</ul>
									)}
								</Droppable>
							</Col>
						);
					})}
			</DragDropContext>
		</Row>
	);
};

export default Board;
