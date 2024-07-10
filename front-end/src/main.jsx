import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './styles/globals.css';
import {
	createBrowserRouter,
	RouterProvider,
	redirect,
} from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { InvoiceDetails } from './views/InvoiceDetails/InvoiceDetails';
import { MainPage } from './views/MainPage/MainPage.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <MainPage />,
			},
			{
				path: 'invoice/:id',
				element: <InvoiceDetails />,
			},
			{
				path: '*',
				loader: () => redirect('/'),
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}>
				<App />
			</RouterProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
