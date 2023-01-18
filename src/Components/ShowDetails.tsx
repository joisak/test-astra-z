import {
	Grid,
	IconButton,
	Rating,
	Box,
	Stack,
	Chip,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ITVShow } from '../types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface props {
	data: ITVShow | null;
	favorite: boolean;
	showId: string | undefined;
}

const ShowDetails = ({ data, favorite, showId }: props) => {
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
				<Grid item>
					<Box paddingBottom={1}>
						<Typography variant="h4">{data.name}</Typography>
					</Box>
					{data.network?.country.name && (
						<Typography variant="caption" paddingRight={'4px'}>
							{data.network?.country.name} |
						</Typography>
					)}
					{data.network?.name && (
						<Typography variant="caption" paddingRight={'4px'}>
							{data.network?.name} |
						</Typography>
					)}
					<Typography variant="caption">{data?.language}</Typography>
					<Box paddingBottom={1}>
						<Typography variant="caption">
							{data.premiered.slice(0, 4)} -
							{data.ended ? data.ended.slice(0, 4) : ' On going'} | Episodes:{' '}
							{data?.averageRuntime} minutes
						</Typography>
					</Box>

					<Box paddingBottom={'12px'}>
						<img src={data.image?.['medium']} alt="cool" />
					</Box>

					{data.rating.average && (
						<Box alignItems="center" display={'flex'}>
							<Rating
								name="size-small"
								readOnly
								precision={0.1}
								value={data.rating.average}
								size="medium"
								max={10}
							/>
							<Typography paddingLeft={'12px'} fontWeight="600">
								{data.rating.average}
							</Typography>
						</Box>
					)}

					<Box>
						<Typography variant="caption">Add to favorites</Typography>
						<IconButton onClick={() => addOrDeleteFavorite(data)}>
							{isFavorite ? (
								<FavoriteIcon style={{ fill: 'red' }} />
							) : (
								<FavoriteBorderIcon />
							)}
						</IconButton>
					</Box>

					<Stack direction="row" spacing={1}>
						{data.genres?.map((genre: string) => {
							return <Chip label={genre} variant="outlined" key={genre} />;
						})}
					</Stack>
					<Typography
						dangerouslySetInnerHTML={{ __html: data.summary }}
						maxWidth={'600px'}
					></Typography>
				</Grid>
			</Grid>
		)
	);
};

export default ShowDetails;
