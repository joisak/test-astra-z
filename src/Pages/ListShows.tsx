import {
	Box,
	Button,
	CircularProgress,
	TextField,
	Typography,
} from '@mui/material';
import List from '@mui/material/List';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IDataResponse } from '../types';
import FavoiritesModal from '../Components/FavoriteModal';
import TvShowListItem from '../Components/TvShowListItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocalStorageListShows } from '../useLocalStorageListShows';

const ListShows = () => {
	const [results, setResults] = useState<IDataResponse[]>([]);
	const [latestSearchValue, setLatestSearchValue] = useState('');
	const [error, setError] = useState(false);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// Getting data from localStorage
	const [localStorageResults, localStorageFavorites, localStorageSearchValue] =
		useLocalStorageListShows();

	const baseUrl = 'https://api.tvmaze.com/';

	const searchShow = (show: string) => {
		setLatestSearchValue(show);
		setLoading(true);
		axios
			.get(baseUrl + 'search/shows?q=' + show)
			.then(({ data }) => {
				setResults(data);
				localStorage.setItem(
					'searchForSeriesSearchResults',
					JSON.stringify(data)
				);
			})
			.catch((error: Error) => {
				console.log('Error: ', error);
				setError(true);
			})
			.finally(() => setLoading(false));

		localStorage.setItem('searchForSeriesSearchValue', show);
	};

	const showNoResults = () => {
		if (!results.length && latestSearchValue.length > 3)
			return (
				<Typography variant="subtitle2">
					Sorry, can't find any shows...
				</Typography>
			);
	};

	const showError = () => <Typography variant="subtitle2">Error...</Typography>;

	useEffect(() => {
		if (localStorageResults) {
			setResults(localStorageResults);
			setLatestSearchValue(localStorageSearchValue);
		}
	}, [localStorageResults, localStorageSearchValue]);

	return (
		<>
			<Typography variant="h4" textAlign={'center'} padding={'24px'}>
				Search for TV-series
			</Typography>
			<Box display={'flex'}>
				<TextField
					id="search-field"
					variant="outlined"
					fullWidth
					value={latestSearchValue}
					onChange={(e) => searchShow(e.target.value)}
				/>
				{localStorageFavorites.length > 0 && (
					<Button onClick={handleOpen}>
						<FavoriteIcon style={{ fill: 'red' }} />
					</Button>
				)}
			</Box>
			<Box display={'flex'} justifyContent="center" paddingTop={'24px'}>
				{loading && <CircularProgress />}
			</Box>
			<List>
				{results.map((result) => {
					return <TvShowListItem data={result.show} key={result.show.id} />;
				})}
			</List>
			{showNoResults()}

			{error && showError}
			<FavoiritesModal
				handleClose={handleClose}
				open={open}
				favorites={localStorageFavorites}
			/>
		</>
	);
};

export default ListShows;
