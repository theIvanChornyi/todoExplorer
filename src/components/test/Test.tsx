import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Column from './Column';
import { init } from './data';
import { useDrag } from './hooks';

const style: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-around',
	marginTop: 10,
	textAlign: 'center',
};

const Test = () => {
	const { state, onDragEnd } = useDrag(init);
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div style={style}>
				{state.columnOrder.map(id => {
					const column = state.columns[id];
					const cards = column.cardsId.map(cardId => state.cards[cardId]);
					return <Column key={id} column={column} cards={cards} />;
				})}
			</div>
		</DragDropContext>
	);
};

export default Test;
