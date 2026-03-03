<template>
    <section id="work" class="py-28 bg-slate-900">
  <div class="max-w-7xl mx-auto px-6">

    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-white">Featured Projects</h2>
      <p class="text-slate-400 mt-3">Explore our latest creative endeavors</p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      <div
        v-for="(project, index) in projects"
        :key="index"
        class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-indigo-500/30 transition-all duration-300"
      >
        <div
          class="h-56 flex items-center justify-center text-5xl"
          :style="{ backgroundColor: project.color }"
        >
          {{ project.icon }}
        </div>

        <div class="p-6">
          <p class="text-indigo-400 text-sm uppercase tracking-wide">
            {{ project.category }}
          </p>
          <h3 class="text-xl font-bold text-white mt-2">
            {{ project.title }}
          </h3>
          <p class="text-slate-400 mt-2 text-sm">
            {{ project.description }}
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
</template>