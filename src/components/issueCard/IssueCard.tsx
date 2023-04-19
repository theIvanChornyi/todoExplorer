import { FC } from 'react';
import { Badge, Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

import { cooldownDate } from 'helpers';
import style from './IssueCard.module.scss';
import { IIssue } from 'service/API/types';

interface IProps {
	items: IIssue[];
}

const IssueCard: FC<IProps> = ({ items }) => {
	return (
		<>
			{items.map((card, index) => (
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
									<p>
										#{card.number} | opened {cooldownDate(card.created_at)}
									</p>
									<p>Coments: {card.comments}</p>
								</Card>
							</Badge.Ribbon>
						</li>
					)}
				</Draggable>
			))}
		</>
	);
};

export default IssueCard;
