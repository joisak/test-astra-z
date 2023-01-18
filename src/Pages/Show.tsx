import { Box, CircularProgress, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ITVShow } from '../types';
import ShowDetails from '../Components/ShowDetails';
import { useLocalStorageShowDetails } from '../useLocalStorageShowDetails';
import axios from 'axios';
const Show = () => {
	const location = useLocation();
	const urlId: string | undefined = location.pathname.length
		? location.pathname.split('/').pop()
		: '';

	// Gertting data from localstorage
	const [
		localStorageData,
		localStorageError,
		localStorageFavorite,
		localStorageloading,
	] = useLocalStorageShowDetails(urlId);

	const [show, setShow] = useState<ITVShow | null>(null);
	const [error, setError] = useState(true);
	const [loading, setLoading] = useState(true);

	const getShow = (id: string) => {
		setLoading(true);
		axios
			.get('https://api.tvmaze.com/shows/' + id)
			.then(({ data }) => {
				setShow(data);
				setError(false);
			})
			.catch((error: Error) => {
				console.log('Error:', error);
				setError(true);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		console.log(localStorageloading);
		setLoading(localStorageloading);
		// If there is no data in localstorage, it will fetch it from the api
		if (urlId && !localStorageData && !localStorageloading) {
			getShow(urlId);
		} else {
			setError(false);
			setLoading(false);
		}
	}, [urlId, localStorageData, localStorageloading, error]);
	if (loading) {
		return (
			<Box display={'flex'} justifyContent="center" paddingTop={'24px'}>
				<CircularProgress />
			</Box>
		);
	}
	if (error && (localStorageError || error)) {
		return (
			<>
				<Typography variant="h2" paddingTop={'24px'}>
					Couldent find that id...
				</Typography>
				<Link href="/">
					<Typography>Go back to search</Typography>
				</Link>
			</>
		);
	} else
		return (
			(localStorageData || show) && (
				<>
					<ShowDetails
						data={localStorageData?.show || show}
						favorite={localStorageFavorite}
						showId={urlId}
					/>
					<Link href="/">
						<Typography>Go back to search</Typography>
					</Link>
				</>
			)
		);
};

export default Show;
