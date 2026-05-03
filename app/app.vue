<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="border-b border-slate-200 bg-white">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <NuxtLink
          to="/"
          class="text-lg font-bold tracking-tight text-slate-950 hover:text-slate-700"
        >
          🌍 Country Explorer
        </NuxtLink>

        <nav class="flex items-center gap-6 text-sm font-medium text-slate-600">
          <NuxtLink to="/" class="hover:text-slate-950"> Home </NuxtLink>

          <a
            href="https://restcountries.com/"
            target="_blank"
            class="hover:text-slate-950"
          >
            API
          </a>
        </nav>
      </div>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer class="mt-20 border-t border-slate-200 bg-white">
      <div
        class="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8"
      >
        <p>Built with Nuxt 4, Tailwind CSS and public APIs.</p>
      </div>
    </footer>
  </div>
</template>
