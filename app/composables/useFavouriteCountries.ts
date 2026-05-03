const STORAGE_KEY = "favourite-countries";

export const useFavouriteCountries = () => {
  const favourites = useState<string[]>("favourite-countries", () => []);

  const loadFavourites = () => {
    if (!import.meta.client) return;

    const stored = localStorage.getItem(STORAGE_KEY);

    favourites.value = stored ? JSON.parse(stored) : [];
  };

  const saveFavourites = () => {
    if (!import.meta.client) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites.value));
  };

  const isFavourite = (code: string) => {
    return favourites.value.includes(code);
  };

  const toggleFavourite = (code: string) => {
    if (isFavourite(code)) {
      favourites.value = favourites.value.filter((item) => item !== code);
    } else {
      favourites.value = [...favourites.value, code];
    }

    saveFavourites();
  };

  return {
    favourites,
    loadFavourites,
    isFavourite,
    toggleFavourite,
  };
};
