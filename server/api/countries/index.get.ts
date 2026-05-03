import type { CountrySummary } from "~~/shared/types/country";

type RestCountry = {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  flags: {
    svg: string;
    png: string;
  };
  region: string;
  capital?: string[];
  population: number;
};

export default defineCachedEventHandler(
  async (): Promise<CountrySummary[]> => {
    const countries = await $fetch<RestCountry[]>(
      "https://restcountries.com/v3.1/all?fields=name,cca2,flags,region,capital,population",
    );

    return countries
      .map((country) => ({
        name: country.name.common,
        officialName: country.name.official,
        code: country.cca2,
        flag: country.flags.svg || country.flags.png,
        region: country.region,
        capital: country.capital?.[0] ?? null,
        population: country.population,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  },
  {
    maxAge: 60 * 60,
    name: "countries-list",
    getKey: () => "all",
  },
);
