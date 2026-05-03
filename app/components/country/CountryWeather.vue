<script setup lang="ts">
const props = defineProps<{
  latitude: number | null;
  longitude: number | null;
}>();

const {
  data: weather,
  pending,
  error,
} = await useCountryWeather(
  () => props.latitude,
  () => props.longitude,
);

const weatherLabel = computed(() => {
  if (!weather.value) return "Unknown";

  const code = weather.value.weatherCode;

  if (code === 0) return "Clear sky";
  if ([1, 2, 3].includes(code)) return "Partly cloudy";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
  if ([71, 73, 75, 77].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Rain showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";

  return "Unknown";
});
</script>

<template>
  <section class="rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
    <h2 class="text-xl font-semibold">Current Weather</h2>

    <div v-if="pending" class="mt-4 text-slate-300">Loading weather...</div>

    <div v-else-if="error" class="mt-4 text-red-200">
      Weather data unavailable.
    </div>

    <div v-else-if="!weather" class="mt-4 text-slate-300">
      No coordinates available for this country.
    </div>

    <div v-else class="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
      <article class="rounded-2xl bg-white/10 p-4">
        <p class="text-sm text-slate-300">Temperature</p>
        <p class="mt-1 text-3xl font-bold">{{ weather.temperature }}°C</p>
      </article>

      <article class="rounded-2xl bg-white/10 p-4">
        <p class="text-sm text-slate-300">Wind</p>
        <p class="mt-1 text-3xl font-bold">{{ weather.windSpeed }} km/h</p>
      </article>

      <article class="rounded-2xl bg-white/10 p-4">
        <p class="text-sm text-slate-300">Condition</p>
        <p class="mt-1 text-2xl font-bold">
          {{ weatherLabel }}
        </p>
      </article>
    </div>
  </section>
</template>
