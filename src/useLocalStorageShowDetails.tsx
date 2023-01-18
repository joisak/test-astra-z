import { useEffect, useState } from 'react';
import { IDataResponse, ITVShow } from './types';

export function useLocalStorageShowDetails(
	urlId: string | undefined
): [IDataResponse | null, any, boolean, boolean] {
	const [data, setData] = useState<IDataResponse | null>(null);
	const [favorite, setFavorite] = useState<boolean>(false);
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const hasFavorites = localStorage.getItem('searchForSeriesFavorites');
		if (hasFavorites) {
			const favorites = JSON.parse(hasFavorites || '');
			const isFavorite = favorites?.find((favorite: ITVShow) => {
				return String(favorite.id) === urlId;
			});
			setFavorite(isFavorite ? true : false);
		}

		const hasSearchResults = localStorage.getItem(
			'searchForSeriesSearchResults'
		);
		if (hasSearchResults) {
			let latestSearchResults = JSON.parse(hasSearchResults || '');
			let showData = latestSearchResults.find((item: IDataResponse) => {
				return String(item.show.id) === urlId;
			});

			if (showData) {
				setData(showData);
			} else {
				console.log('ERROR!');
				setError(true);
			}
		} else {
			setError(true);
		}
		setLoading(false);
	}, [urlId]);

	return [data, error, favorite, loading];
}
