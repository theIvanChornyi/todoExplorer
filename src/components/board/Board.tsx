import { Col, Row, Card, Badge } from 'antd';
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import style from './Board.module.scss';
import { IIssue } from 'service/API/types';
import { cooldownDate } from 'helpers';
import { selectCurrentBoard } from 'redux/boards/selectors.boards';
import { useDispatch } from 'react-redux';
import { reorderBetweenCol, reorderInsideCol } from 'redux/boards/slice.boards';

const Board = () => {
	const dispatch = useDispatch();
	const boards = useSelector(selectCurrentBoard);

	const onDragEnd = ({ destination, source }: DropResult) => {
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		const startColumn = boards[source.droppableId];
		const finishColumn = boards[destination.droppableId];

		if (startColumn === finishColumn) {
			const newCardsArr: IIssue[] = Array.from(startColumn.items);
			const deleted = newCardsArr.splice(source.index, 1);
			newCardsArr.splice(destination.index, 0, ...deleted);

			return dispatch(
				reorderInsideCol({ items: newCardsArr, title: source.droppableId })
			);
		}

		const newStartCardsArr: IIssue[] = Array.from(startColumn.items);
		const deleted = newStartCardsArr.splice(source.index, 1);

		const newFinishIds: IIssue[] = Array.from(finishColumn.items);
		newFinishIds.splice(destination.index, 0, ...deleted);

		dispatch(
			reorderBetweenCol([
				{ title: source.droppableId, items: newStartCardsArr },
				{ title: destination.droppableId, items: newFinishIds },
			])
		);
	};

	const cardList = (items: IIssue[]) => {
		return items.map((card, index) => (
			<Draggable draggableId={`${card.id}`} index={index} key={`${card.id}`}>
				{provided => (
					<li
						className={style.column__item}
						{...provided.dragHandleProps}
						{...provided.draggableProps}
						ref={provided.innerRef}
					>
						<Badge.Ribbon text={card.user.type}>
							<Card title={card.title} bordered hoverable>
								<p>{card.title}</p>
								<p>opened {cooldownDate(card.created_at)}</p>
							</Card>
						</Badge.Ribbon>
					</li>
				)}
			</Draggable>
		));
	};

	return (
		<Row justify="space-between" align="stretch" gutter={16}>
			<DragDropContext onDragEnd={onDragEnd}>
				{Object.keys(boards).map(key => {
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
										{cardList(items)}
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
