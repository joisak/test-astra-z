import React from 'react';
import ListShows from './Pages/ListShows';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Show from './Pages/Show';
import NotFound from './Pages/404';
import { Box } from '@mui/material';

function App() {
	return (
		<div className="App">
			<Box maxWidth={'1200px'} margin={'0 auto'}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<ListShows />} />
						<Route path="/show/:id" element={<Show />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</Box>
		</div>
	);
}

export default App;
