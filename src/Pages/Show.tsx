import { Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import FadeIn from '../Components/FadeIn/FadeIn';
import ShowWrapper from '../Components/ShowDetails/ShowWrapper';
import { useLocalStorageFavorites } from '../useLocalStorageFavorites';
const Show = () => {
	const location = useLocation();
	const urlId: string | undefined = location.pathname.length
		? location.pathname.split('/').pop()
		: '';

	const showDetails = location.state;

	// Gertting your favoirite shows from localstorage
	const [localStorageFavorite] = useLocalStorageFavorites(urlId);

	return (
		<FadeIn>
			<ShowWrapper
				data={showDetails}
				favorite={localStorageFavorite}
				showId={urlId}
			/>
			<Link href="/">
				<Typography>Go back to search</Typography>
			</Link>
		</FadeIn>
	);
};

export default Show;
