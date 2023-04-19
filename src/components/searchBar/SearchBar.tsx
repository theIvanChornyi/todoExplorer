import { Controller } from 'react-hook-form';
import { Input, InputRef } from 'antd';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { useSearch } from 'hooks/Search.hook';
import { selectState } from 'redux/boards/selectors.boards';
import { STATE_MACHINE } from 'redux/boards/types';

const { Search } = Input;

export interface IInputs {
	request: string;
}

const SearchBar = () => {
	const state = useSelector(selectState);
	const ref = useRef<InputRef>(null);
	const { handleSubmit, control, errors, onSubmit, onBlur, contextHolder } =
		useSearch(ref);

	const placeholder = errors.request
		? 'This field is required'
		: 'Enter repo URL';

	return (
		<>
			{contextHolder}
			<Controller
				name="request"
				control={control}
				rules={{
					required: true,
				}}
				render={({ field }) => (
					<Search
						{...field}
						ref={ref}
						enterButton="Load issues"
						onSearch={(_, e) => handleSubmit(onSubmit).apply(e)}
						onBlur={onBlur}
						loading={state === STATE_MACHINE.LOADING}
						placeholder={placeholder}
						status={errors.request && 'error'}
					/>
				)}
			/>
		</>
	);
};

export default SearchBar;
