import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

import './index.scss';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</ThemeProvider>
	</>
);
