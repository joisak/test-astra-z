import { useEffect, useState } from 'react';
import { IDataResponse, ITVShow } from './types';

export function useLocalStorageListShows(): [
	IDataResponse[],
	ITVShow[],
	string
] {
	const [favorites, setFavorites] = useState<ITVShow[]>([]);
	const [latestSearchValue, setLatestSearchValue] = useState('');
	const [results, setResults] = useState<IDataResponse[]>([]);

	useEffect(() => {
		const localStorageSearchResults = localStorage.getItem(
			'searchForSeriesSearchResults'
		);
		const localStorageFavoritesSeries = localStorage.getItem(
			'searchForSeriesFavorites'
		);
		const localStoragesearchSeriesValue = localStorage.getItem(
			'searchForSeriesSearchValue'
		);
		if (localStorageSearchResults) {
			const latestSearchArray = JSON.parse(localStorageSearchResults);
			const searchValue = localStoragesearchSeriesValue || '';
			setLatestSearchValue(searchValue);

			if (latestSearchArray) {
				setResults(latestSearchArray);
			}
		}

		if (localStorageFavoritesSeries) {
			const favorites = JSON.parse(localStorageFavoritesSeries);
			setFavorites(favorites);
		}
	}, []);

	return [results, favorites, latestSearchValue];
}
