import { useEffect, useState } from 'react';
import { ITVShow } from './types';

export function useLocalStorageFavorites(urlId: string | undefined): [boolean] {
	const [favorite, setFavorite] = useState<boolean>(false);

	useEffect(() => {
		const hasFavorites = localStorage.getItem('searchForSeriesFavorites');
		if (hasFavorites) {
			const favorites = JSON.parse(hasFavorites);
			const isFavorite = favorites?.find((favorite: ITVShow) => {
				return String(favorite.id) === urlId;
			});
			setFavorite(isFavorite ? true : false);
		}
	}, [urlId]);

	return [favorite];
}
