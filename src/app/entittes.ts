export interface Game {
    id: string,
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: number;
    genres: Array<Genre>;
    parent_platforms: Array<ParentPlatform>;
    publishers: Array<Publishers>;
    ratings: Array<Rating>;
    screenshots: Array<Screenshots>;
    trailers: Array<Trailer>;
    description_raw: string
}
export interface APIResponse<T> {
    results: Array<T>;
}

interface Genre {
    name: string
}
interface ParentPlatform {
    platform: {
        id: number, name: string, slug: string
    };
}
interface Publishers {
    name: string;
}
interface Screenshots {
    image: string;
}
interface Rating {
    id: number;
    count: number;
    title: string;
}
interface Trailer {
    data: {
        max: string;
    };
}