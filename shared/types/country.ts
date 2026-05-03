export type CountrySummary = {
  name: string;
  officialName: string;
  code: string;
  flag: string;
  region: string;
  capital: string | null;
  population: number;
};

export type CountryDetails = CountrySummary & {
  subregion: string | null;
  languages: string[];
  currencies: string[];
  area: number;
  latlng: [number, number] | null;
  mapsUrl: string | null;
};
