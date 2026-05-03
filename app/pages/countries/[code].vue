<script setup lang="ts">
const route = useRoute();

const code = computed(() => String(route.params.code).toUpperCase());

const { data: country, pending, error } = await useCountryDetails(code);
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <section class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" class="mb-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          ← Back to countries
        </NuxtLink>
      </nav>

      <section
        v-if="pending"
        aria-live="polite"
        class="rounded-2xl bg-white p-8 shadow-sm"
      >
        <p class="text-slate-600">Loading country...</p>
      </section>

      <section
        v-else-if="error"
        role="alert"
        class="rounded-2xl bg-white p-8 shadow-sm"
      >
        <h1 class="text-2xl font-bold text-slate-900">Country not found</h1>
        <p class="mt-2 text-slate-600">
          We could not load this country right now.
        </p>
      </section>

      <article
        v-else-if="country"
        class="overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/70 ring-1 ring-slate-200"
      >
        <header
          class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center"
        >
          <figure
            class="flex min-h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 p-8"
          >
            <img
              :src="country.flag"
              :alt="`${country.name} flag`"
              class="mx-auto h-64 w-full object-contain"
            />
          </figure>

          <section aria-labelledby="country-title">
            <p
              class="text-sm font-semibold uppercase tracking-wide text-slate-500"
            >
              {{ country.region }}
            </p>

            <h1
              id="country-title"
              class="mt-3 text-4xl font-bold tracking-tight text-slate-950"
            >
              {{ country.name }}
            </h1>

            <p class="mt-3 text-lg text-slate-600">
              {{ country.officialName }}
            </p>

            <nav
              v-if="country.mapsUrl"
              aria-label="Country actions"
              class="mt-6"
            >
              <a
                :href="country.mapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View on Google Maps
              </a>
            </nav>
          </section>
        </header>

        <section
          class="grid gap-6 border-t border-slate-200 p-6 sm:p-8 lg:grid-cols-2"
        >
          <section
            aria-labelledby="facts-title"
            class="rounded-2xl bg-slate-50 p-6"
          >
            <h2 id="facts-title" class="text-xl font-bold text-slate-950">
              Country facts
            </h2>

            <dl class="mt-6 grid gap-4">
              <div class="grid gap-1">
                <dt class="text-sm font-medium text-slate-500">Capital</dt>
                <dd class="font-semibold text-slate-950">
                  {{ country.capital || "N/A" }}
                </dd>
              </div>

              <div class="grid gap-1">
                <dt class="text-sm font-medium text-slate-500">Subregion</dt>
                <dd class="font-semibold text-slate-950">
                  {{ country.subregion || "N/A" }}
                </dd>
              </div>

              <div class="grid gap-1">
                <dt class="text-sm font-medium text-slate-500">Population</dt>
                <dd class="font-semibold text-slate-950">
                  {{ country.population.toLocaleString() }}
                </dd>
              </div>

              <div class="grid gap-1">
                <dt class="text-sm font-medium text-slate-500">Area</dt>
                <dd class="font-semibold text-slate-950">
                  {{ country.area.toLocaleString() }} km²
                </dd>
              </div>

              <div class="grid gap-1">
                <dt class="text-sm font-medium text-slate-500">Languages</dt>
                <dd class="font-semibold text-slate-950">
                  {{ country.languages.join(", ") || "N/A" }}
                </dd>
              </div>

              <div class="grid gap-1">
                <dt class="text-sm font-medium text-slate-500">Currencies</dt>
                <dd class="font-semibold text-slate-950">
                  {{ country.currencies.join(", ") || "N/A" }}
                </dd>
              </div>
            </dl>
          </section>

          <CountryWeather
            :latitude="country.latlng?.[0] ?? null"
            :longitude="country.latlng?.[1] ?? null"
          />
        </section>
      </article>
    </section>
  </main>
</template>
