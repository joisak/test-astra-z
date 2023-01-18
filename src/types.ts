export interface ITVShow {
    name: string;
    premiered: string;
    ended: string;
    id: string;
    image?: IShowImage;
    averageRuntime?: string;
    summary: string;
    genres: [];
    rating: IRating;
    language: string;
    network: INetwork;
}

export interface IDataResponse {
    score: number;
    show: ITVShow;
}

export interface IShowImage {
    medium: string;
}

export interface IRating {
    average: number;
}

export interface INetwork {
    name: string;
    country: ICountry;
}

export interface ICountry {
    name: string;
}