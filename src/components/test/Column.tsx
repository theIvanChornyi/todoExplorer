import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ICard, IColumn } from './types';
import Card from './Card';

interface IProps {
	column: IColumn;
	cards: ICard[];
}

const style: React.CSSProperties = {
	width: 300,
	background: 'lightgray',
	border: '1px dashed black',
	display: 'flex',
	flexDirection: 'column',
};

const Column: FC<IProps> = ({ column, cards }) => {
	return (
		<div style={style}>
			<h2>{column.title}</h2>
			<Droppable droppableId={column.id}>
				{(provided, { isDraggingOver }) => (
					<div
						style={{
							padding: 20,
							display: 'flex',
							flexDirection: 'column',
							transition: 'background-color linear .2s ',
							flexGrow: 1,
							background: isDraggingOver ? 'navy' : 'lightgray',
						}}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{cards.map((card, index) => (
							<Card key={card.id} index={index} {...card} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Column;
