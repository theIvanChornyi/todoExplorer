import { useRef } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input, InputRef } from 'antd';
import { useDispatch } from 'react-redux';
import { CloseCircleTwoTone } from '@ant-design/icons';

import { AppDispatch } from 'redux/types';
import { getIssues } from 'redux/boards/thunk.boards';

const { Search } = Input;

interface IInputs {
	request: string;
}

const SearchBar = () => {
	const ref = useRef<InputRef>(null);
	const dispatch = useDispatch<AppDispatch>();
	const {
		handleSubmit,
		control,
		formState: { errors },
		clearErrors,
	} = useForm<IInputs>();

	const onSubmit: SubmitHandler<IInputs> = data => {
		dispatch(getIssues(data.request));
		ref.current?.blur();
	};

	const onBlur = () => {
		clearErrors();
	};

	const placeholder = errors.request
		? 'This field is required'
		: 'Enter repo URL';

	return (
		<Controller
			name="request"
			control={control}
			rules={{ required: true }}
			render={({ field }) => (
				<Search
					{...field}
					ref={ref}
					enterButton="Load issues"
					onSearch={(_, e) => handleSubmit(onSubmit).apply(e)}
					onBlur={onBlur}
					loading={false}
					allowClear={{
						clearIcon: <CloseCircleTwoTone twoToneColor="#1677ff" />,
					}}
					placeholder={placeholder}
					status={errors.request && 'error'}
				/>
			)}
		/>
	);
};

export default SearchBar;
