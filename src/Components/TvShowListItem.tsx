import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import React from 'react';

import { ITVShow } from '../types';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Link } from 'react-router-dom';

interface props {
	data: ITVShow;
}

const TvShowListItem = ({ data }: props) => {
	return (
		<Link state={data} to={'/show/' + data.id} key={data.id}>
			<ListItem
				sx={{
					width: '100%',
				}}
			>
				<ListItemAvatar>
					{data.image?.medium ? (
						<Avatar
							alt={data.name}
							src={data.image.medium}
							variant="square"
							sx={{ width: 56, height: 56 }}
						/>
					) : (
						<Avatar variant="square" sx={{ width: 56, height: 56 }}>
							<PhotoSizeSelectActualIcon />
						</Avatar>
					)}
				</ListItemAvatar>
				<ListItemText
					primary={data.name}
					secondary={data.premiered}
					style={{ paddingLeft: '12px' }}
				/>
			</ListItem>
		</Link>
	);
};

export default TvShowListItem;
