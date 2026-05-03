<script setup lang="ts">
const search = ref("");
const selectedRegion = ref("all");

const regions = ["all", "Africa", "Americas", "Asia", "Europe", "Oceania"];

const { data: countries, pending, error } = await useCountries();

const { favourites, loadFavourites, isFavourite, toggleFavourite } =
  useFavouriteCountries();

onMounted(() => {
  loadFavourites();
});

const filteredCountries = computed(() => {
  return countries.value.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.value.toLowerCase());

    const matchesRegion =
      selectedRegion.value === "all" || country.region === selectedRegion.value;

    return matchesSearch && matchesRegion;
  });
});
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header
        class="mb-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
      >
        <p class="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Public API Portfolio Project
        </p>

        <h1
          class="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl"
        >
          Country Weather Explorer
        </h1>

        <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Explore countries, filter by region, and view live weather data
          powered by REST Countries and Open-Meteo.
        </p>

        <dl class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl bg-slate-50 p-4">
            <dt class="text-sm text-slate-500">Data source</dt>
            <dd class="mt-1 font-semibold text-slate-950">REST Countries</dd>
          </div>

          <div class="rounded-2xl bg-slate-50 p-4">
            <dt class="text-sm text-slate-500">Weather</dt>
            <dd class="mt-1 font-semibold text-slate-950">Open-Meteo</dd>
          </div>

          <div class="rounded-2xl bg-slate-50 p-4">
            <dt class="text-sm text-slate-500">Built with</dt>
            <dd class="mt-1 font-semibold text-slate-950">
              Nuxt 4 + TypeScript
            </dd>
          </div>

          <div class="rounded-2xl bg-slate-50 p-4">
            <dt class="text-sm text-slate-500">Saved favourites</dt>
            <dd class="mt-1 font-semibold text-slate-950">
              {{ favourites.length }}
            </dd>
          </div>
        </dl>
      </header>

      <section
        aria-labelledby="filters-title"
        class="mb-10 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
      >
        <h2 id="filters-title" class="sr-only">Country filters</h2>

        <form class="grid gap-4 md:grid-cols-[1fr_220px]">
          <UInput
            v-model="search"
            placeholder="Search country..."
            icon="i-lucide-search"
            size="lg"
            aria-label="Search country"
          />

          <USelect
            v-model="selectedRegion"
            :items="regions"
            size="lg"
            aria-label="Filter by region"
          />
        </form>
      </section>

      <section
        v-if="pending"
        aria-live="polite"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <article
          v-for="item in 8"
          :key="item"
          class="h-72 animate-pulse rounded-3xl bg-white shadow-sm ring-1 ring-slate-200"
        />
      </section>

      <section
        v-else-if="error"
        role="alert"
        class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
      >
        <h2 class="text-2xl font-bold text-slate-950">
          Failed to load countries
        </h2>

        <p class="mt-2 text-slate-600">
          Please refresh the page or try again later.
        </p>
      </section>

      <section
        v-else-if="filteredCountries.length === 0"
        class="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200"
      >
        <h2 class="text-2xl font-bold text-slate-950">No countries found</h2>

        <p class="mt-2 text-slate-600">Try another search term or region.</p>
      </section>

      <section
        v-else
        aria-label="Countries"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <article
          v-for="country in filteredCountries"
          :key="country.code"
          class="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <NuxtLink
            :to="`/countries/${country.code}`"
            class="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
          >
            <figure
              class="relative flex h-44 items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 p-6"
            >
              <img
                :src="country.flag"
                :alt="`${country.name} flag`"
                class="max-h-32 w-full object-contain transition duration-300 group-hover:scale-105"
              />

              <button
                type="button"
                :class="[
                  'absolute right-3 top-3 flex size-9 items-center justify-center rounded-full shadow-md ring-1 ring-slate-200 transition hover:scale-105',
                  isFavourite(country.code)
                    ? 'bg-yellow-400 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100',
                ]"
                :aria-label="
                  isFavourite(country.code)
                    ? 'Remove from favourites'
                    : 'Add to favourites'
                "
                @click.prevent="toggleFavourite(country.code)"
              >
                <UIcon
                  name="i-lucide-star"
                  :class="[
                    'text-lg transition',
                    isFavourite(country.code) ? 'fill-current' : 'opacity-70',
                  ]"
                />
              </button>
            </figure>

            <section class="p-5">
              <p
                class="text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {{ country.region }}
              </p>

              <h2 class="mt-2 text-lg font-bold text-slate-950">
                {{ country.name }}
              </h2>

              <dl class="mt-4 grid gap-2 text-sm">
                <div class="flex items-center justify-between gap-4">
                  <dt class="text-slate-500">Capital</dt>
                  <dd class="font-medium text-slate-900">
                    {{ country.capital || "N/A" }}
                  </dd>
                </div>

                <div class="flex items-center justify-between gap-4">
                  <dt class="text-slate-500">Population</dt>
                  <dd class="font-medium text-slate-900">
                    {{ country.population.toLocaleString() }}
                  </dd>
                </div>
              </dl>

              <p
                class="mt-5 text-sm font-semibold text-slate-950 transition group-hover:translate-x-1"
              >
                View country →
              </p>
            </section>
          </NuxtLink>
        </article>
      </section>
    </section>
  </main>
</template>
