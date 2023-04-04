import {
	Box,
	Chip,
	Grid,
	IconButton,
	Rating,
	Stack,
	Typography,
} from '@mui/material';
import { ITVShow } from '../../types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface props {
	data: ITVShow | null;
	click: (data: ITVShow) => void;
	isFavorite: boolean;
}

const ShowDetails = ({ data, click, isFavorite }: props) => {
	return (
		data && (
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
				{data.premiered && (
					<Box paddingBottom={1}>
						<Typography variant="caption">
							{data.premiered.slice(0, 4)} -
							{data.ended ? data.ended.slice(0, 4) : ' On going'} | Episodes:{' '}
							{data?.averageRuntime} minutes
						</Typography>
					</Box>
				)}
				{data.image && (
					<Box paddingBottom={'12px'}>
						<img src={data.image['medium']} alt={`Poster for ${data.name}`} />
					</Box>
				)}

				{Boolean(data.rating.average) && (
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

				<Box paddingBottom={'12px'}>
					<Typography variant="caption">Add to favorites</Typography>
					<IconButton onClick={() => click(data)}>
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
		)
	);
};

export default ShowDetails;
