import { Link, Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {
	return (
		<>
			<Typography variant="h5">Can't find what you are looking for</Typography>
			<Link href="/">
				<Typography>Go back to search</Typography>
			</Link>
		</>
	);
};

export default NotFound;
