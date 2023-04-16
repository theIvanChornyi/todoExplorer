import { useState } from 'react';
import { IColumn, IConfig } from './types';
import { DropResult } from 'react-beautiful-dnd';

export const useDrag = (init: IConfig) => {
	const [state, setState] = useState(init);

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

		const startColumn = state.columns[source.droppableId];
		const finishColumn = state.columns[destination.droppableId];

		if (startColumn === finishColumn) {
			const newCardsIds: string[] = Array.from(startColumn.cardsId);
			newCardsIds.splice(source.index, 1);
			newCardsIds.splice(destination.index, 0, draggableId);

			const newColumn: IColumn = { ...startColumn, cardsId: newCardsIds };

			return setState(p => ({
				...p,
				columns: { ...p.columns, [newColumn.id]: newColumn },
			}));
		}

		const newStartIds = Array.from(startColumn.cardsId);
		newStartIds.splice(source.index, 1);

		const newStartColumn: IColumn = {
			...startColumn,
			cardsId: newStartIds,
		};

		const newFinishIds = Array.from(finishColumn.cardsId);
		newFinishIds.splice(destination.index, 0, draggableId);

		const newFinishColumn: IColumn = {
			...finishColumn,
			cardsId: newFinishIds,
		};

		setState(p => ({
			...p,
			columns: {
				...p.columns,
				[newStartColumn.id]: newStartColumn,
				[newFinishColumn.id]: newFinishColumn,
			},
		}));
	};

	return { state, setState, onDragEnd };
};
