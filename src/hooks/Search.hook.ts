import { InputRef, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IInputs } from 'components/searchBar/SearchBar';
import { fetchIssues } from 'redux/boards/thunk.boards';
import { AppDispatch } from 'redux/types';
import { setCurrentBoard } from 'redux/boards/slice.boards';
import { selectBoards } from 'redux/boards/selectors.boards';

export const useSearch = (ref: React.RefObject<InputRef>) => {
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useDispatch<AppDispatch>();
	const boards = useSelector(selectBoards);

	const {
		handleSubmit,
		control,
		formState: { errors },
		clearErrors,
		reset,
	} = useForm<IInputs>();

	const error = () => {
		messageApi.open({
			type: 'error',
			content: 'Only "https://github.com/..." is allowed!',
		});
	};

	const onSubmit: SubmitHandler<IInputs> = ({ request }) => {
		if (!request.includes('https://github.com/')) {
			return error();
		}

		if (request in boards) {
			dispatch(setCurrentBoard(request));
		} else {
			dispatch(fetchIssues(request));
		}
		reset();
		ref.current?.blur();
	};

	const onBlur = () => {
		clearErrors();
	};

	return {
		handleSubmit,
		contextHolder,
		control,
		errors,
		onSubmit,
		onBlur,
		ref,
	};
};
