import type { CurrentWeather } from "~~/shared/types/weather";

export const useCountryWeather = (
  latitude: MaybeRefOrGetter<number | null>,
  longitude: MaybeRefOrGetter<number | null>,
) => {
  return useAsyncData<CurrentWeather | null>(
    () => `weather-${toValue(latitude)}-${toValue(longitude)}`,
    async () => {
      const lat = toValue(latitude);
      const lng = toValue(longitude);

      if (lat === null || lng === null) {
        return null;
      }

      return await $fetch("/api/weather", {
        query: {
          latitude: lat,
          longitude: lng,
        },
      });
    },
    {
      watch: [() => toValue(latitude), () => toValue(longitude)],
    },
  );
};
