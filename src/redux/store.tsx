import { FC } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import boards from './boards/slice.boards';

interface IProps {
	children?: JSX.Element | string | JSX.Element[];
}

export const store = configureStore({
	reducer: { boards },
});

const ReduxProvider: FC<IProps> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
