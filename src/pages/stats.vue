<template>
    <section class="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
  <div class="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">

    <div v-for="(stat, index) in stats" :key="index">
      <div class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
        {{ stat.value }}<span class="text-indigo-500">{{ stat.suffix }}</span>
      </div>
      <p class="text-slate-400 mt-2">{{ stat.label }}</p>
    </div>

  </div>
</section>
</template>