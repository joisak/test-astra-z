import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@mui/material';
import React from 'react';
import { ITVShow } from '../types';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Link } from 'react-router-dom';

interface props {
	favorites: ITVShow[];
}

const ListFavorites = ({ favorites }: props) => {
	return (
		<>
			<List>
				{favorites?.map((favorite: ITVShow) => {
					return (
						<Link
							state={favorite}
							to={'/show/' + favorite.id}
							key={favorite.id}
						>
							<ListItem
								sx={{
									width: '100%',
								}}
								style={{ padding: '0px 0px 12px 0' }}
							>
								<ListItemAvatar>
									{favorite.image?.medium ? (
										<Avatar
											alt={favorite.name}
											src={favorite.image.medium}
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
									primary={favorite.name}
									secondary={favorite.premiered.slice(0, 4)}
									style={{ paddingLeft: '12px' }}
								/>
							</ListItem>
						</Link>
					);
				})}
			</List>
		</>
	);
};

export default ListFavorites;
