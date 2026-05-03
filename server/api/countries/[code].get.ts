import type { CountryDetails } from "~~/shared/types/country";

type RestCountryDetails = {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  flags: {
    svg?: string;
    png?: string;
  };
  region: string;
  subregion?: string;
  capital?: string[];
  population: number;
  area: number;
  latlng?: [number, number];
  maps?: {
    googleMaps?: string;
  };
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol?: string }>;
};

export default defineCachedEventHandler(
  async (event): Promise<CountryDetails> => {
    const code = getRouterParam(event, "code")?.toUpperCase();

    if (!code) {
      throw createError({
        statusCode: 400,
        statusMessage: "Country code is required",
      });
    }

    const countries = await $fetch<RestCountryDetails[]>(
      `https://restcountries.com/v3.1/alpha/${code}`,
    );

    const country = countries[0];

    if (!country) {
      throw createError({
        statusCode: 404,
        statusMessage: "Country not found",
      });
    }

    return {
      name: country.name.common,
      officialName: country.name.official,
      code: country.cca2,
      flag: country.flags.svg || country.flags.png || "",
      region: country.region,
      subregion: country.subregion ?? null,
      capital: country.capital?.[0] ?? null,
      population: country.population,
      area: country.area,
      latlng: country.latlng ?? null,
      mapsUrl: country.maps?.googleMaps ?? null,
      languages: Object.values(country.languages ?? {}),
      currencies: Object.values(country.currencies ?? {}).map(
        (currency) => currency.name,
      ),
    };
  },
  {
    maxAge: 60 * 60,
    name: "country-details",
    getKey: (event) =>
      getRouterParam(event, "code")?.toUpperCase() || "unknown",
  },
);
