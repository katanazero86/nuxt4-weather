type City = {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: {
        lon: number;
        lat: number;
    };
}

export const useSelectedCity = () => useState<City | null>('selectedCity', () => null)