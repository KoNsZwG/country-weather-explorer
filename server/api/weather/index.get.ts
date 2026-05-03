import type { CurrentWeather } from "~~/shared/types/weather";

type OpenMeteoResponse = {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    time: string;
  };
};

export default defineCachedEventHandler(
  async (event): Promise<CurrentWeather> => {
    const query = getQuery(event);

    const latitude = Number(query.latitude);
    const longitude = Number(query.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Valid latitude and longitude are required",
      });
    }

    const weather = await $fetch<OpenMeteoResponse>(
      "https://api.open-meteo.com/v1/forecast",
      {
        query: {
          latitude,
          longitude,
          current: "temperature_2m,wind_speed_10m,weather_code",
        },
      },
    );

    return {
      temperature: weather.current.temperature_2m,
      windSpeed: weather.current.wind_speed_10m,
      weatherCode: weather.current.weather_code,
      time: weather.current.time,
    };
  },
  {
    maxAge: 60 * 15,
    name: "weather-current",
    getKey: (event) => {
      const query = getQuery(event);

      return `${query.latitude}-${query.longitude}`;
    },
  },
);
