import { Col, Row, Card, Badge } from 'antd';
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { getAllIssue } from 'redux/repo/selectors.repo';
import style from './Board.module.scss';
import { BoardsType } from './Board.types';
import { IIssue } from 'service/API/types';
import { cooldownDate } from 'helpers';

const boardsInit: BoardsType = [
	{ boadrId: 'col-2', title: 'In Progress', items: [] },
	{ boadrId: 'col-3', title: 'Done', items: [] },
];

const Board = () => {
	const issues = useSelector(getAllIssue);
	const [boards, setBoards] = useState<BoardsType>([
		{
			items: issues,
			boadrId: 'col-1',
			title: 'ToDo',
		},
		...boardsInit,
	]);

	const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		console.log('destination', destination);
		console.log('draggableId', draggableId);
		console.log('source', source);
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
		<Row justify="space-between" align="stretch" gutter={[16, 16]}>
			<DragDropContext onDragEnd={onDragEnd}>
				{boards.map(({ boadrId, title, items }) => (
					<Col span={7} key={boadrId}>
						<h2 className={style.column__title}>{title}</h2>
						<Droppable droppableId={boadrId}>
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
				))}
			</DragDropContext>
		</Row>
	);
};

export default Board;
