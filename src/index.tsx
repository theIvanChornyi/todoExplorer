import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import ReduxProvider from 'redux/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<ReduxProvider>
		<App />
	</ReduxProvider>
);
reportWebVitals();
