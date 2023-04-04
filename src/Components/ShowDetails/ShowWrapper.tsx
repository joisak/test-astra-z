import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { ITVShow } from '../../types';
import ShowDetails from './ShowDetails';

interface props {
	data: ITVShow | null;
	favorite: boolean;
	showId: string | undefined;
}

const ShowWrapper = ({ data, favorite, showId }: props) => {
	const [isFavorite, setIsFavorite] = useState(favorite);

	useEffect(() => {
		setIsFavorite(favorite);
	}, [favorite]);

	const addOrDeleteFavorite = (show: ITVShow) => {
		if (localStorage.getItem('searchForSeriesFavorites')) {
			let favorites = JSON.parse(
				localStorage.getItem('searchForSeriesFavorites') || ''
			);
			let isFavorite = favorites.find((favorite: ITVShow) => {
				return String(favorite.id) === showId;
			});

			if (isFavorite) {
				favorites = favorites.filter((favorite: ITVShow) => {
					return String(favorite.id) !== showId;
				});
			} else {
				favorites.push(show);
			}

			localStorage.setItem(
				'searchForSeriesFavorites',
				JSON.stringify(favorites)
			);
		} else {
			localStorage.setItem('searchForSeriesFavorites', JSON.stringify([show]));
		}

		setIsFavorite(!isFavorite);
	};

	return (
		data && (
			<Grid
				container
				direction={'column'}
				justifyContent="flex-start"
				paddingTop={'24px'}
			>
				<ShowDetails
					data={data}
					click={addOrDeleteFavorite}
					isFavorite={isFavorite}
				/>
			</Grid>
		)
	);
};

export default ShowWrapper;
