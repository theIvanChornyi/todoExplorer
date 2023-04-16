import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ICard } from './types';

interface IProps extends ICard {
	index: number;
}

const style: React.CSSProperties = {
	border: '2px solid grey',
	padding: 4,
	background: 'white',
	marginBottom: 20,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	columnGap: 8,
};

const Card: FC<IProps> = ({ index, id, title }) => {
	return (
		<Draggable draggableId={id} index={index}>
			{(provided, { isDragging }) => (
				<div {...provided.draggableProps} ref={provided.innerRef}>
					<div
						style={{
							...style,
							background: isDragging ? 'lightgreen' : 'white',
						}}
					>
						{title}
						<div
							{...provided.dragHandleProps}
							style={{
								background: 'lightgrey',
								width: 25,
								height: 25,
								padding: 4,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 8,
							}}
						>
							=
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Card;
