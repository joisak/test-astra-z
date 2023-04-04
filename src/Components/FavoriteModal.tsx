import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import { ITVShow } from '../types';
import ListFavorites from './ListFavorites';

interface props {
	open: boolean;
	handleClose: () => void;
	favorites: ITVShow[];
}

const FavoiritesModal = ({ open, handleClose, favorites }: props) => {
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '75%',
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
		padding: '24px',
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography variant="h5" paddingBottom={1} paddingTop={0.5}>
					Your Favorite shows
				</Typography>
				{favorites.length > 0 && <ListFavorites favorites={favorites} />}
			</Box>
		</Modal>
	);
};

export default FavoiritesModal;
