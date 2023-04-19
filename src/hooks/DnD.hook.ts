import { DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { reorderBetweenCol, reorderInsideCol } from 'redux/boards/slice.boards';
import { IColumn } from 'redux/boards/types';
import { IIssue } from 'service/API/types';

export const useDnD = (boards: IColumn) => {
	const dispatch = useDispatch();
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

		const newStartCardsArr: IIssue[] = Array.from(startColumn.items);
		const deleted = newStartCardsArr.splice(source.index, 1);

		if (startColumn === finishColumn) {
			newStartCardsArr.splice(destination.index, 0, ...deleted);
			return dispatch(
				reorderInsideCol({ items: newStartCardsArr, title: source.droppableId })
			);
		}

		const newFinishIds: IIssue[] = Array.from(finishColumn.items);
		newFinishIds.splice(destination.index, 0, ...deleted);

		dispatch(
			reorderBetweenCol([
				{ title: source.droppableId, items: newStartCardsArr },
				{ title: destination.droppableId, items: newFinishIds },
			])
		);
	};

	return { onDragEnd };
};
