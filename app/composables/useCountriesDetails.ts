import type { CountryDetails } from "~~/shared/types/country";

export const useCountryDetails = (code: MaybeRefOrGetter<string>) => {
  return useAsyncData<CountryDetails>(
    () => `country-${toValue(code)}`,
    () => $fetch(`/api/countries/${toValue(code)}`),
    {
      watch: [() => toValue(code)],
    },
  );
};
