import type { CountrySummary } from "~~/shared/types/country";

export const useCountries = () => {
  return useAsyncData<CountrySummary[]>(
    "countries",
    () => $fetch("/api/countries"),
    {
      default: () => [],
    },
  );
};
