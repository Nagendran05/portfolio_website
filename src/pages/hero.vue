<template>
    <section class="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 px-6">

  <!-- Background Glow -->
  <div class="absolute inset-0 -z-10">
    <div class="absolute w-[600px] h-[600px] bg-indigo-500/40 blur-[120px] rounded-full top-[-200px] right-[-100px] animate-pulse"></div>
    <div class="absolute w-[400px] h-[400px] bg-pink-500/40 blur-[100px] rounded-full bottom-[-100px] left-[-100px]"></div>
  </div>

  <div class="max-w-4xl text-center">

    <div
      :class="[
        'inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 rounded-full text-sm text-indigo-300 mb-8 transition-all duration-700',
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      ]"
    >
      <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      Available for projects
    </div>

    <h1 class="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
      <span class="block">We craft</span>
      <span class="block bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
        digital
      </span>
      <span class="block">experiences</span>
    </h1>

    <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
      Transforming ideas into immersive digital realities through design,
      technology, and strategic innovation.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        class="bg-indigo-500 hover:bg-indigo-600 px-8 py-4 rounded-full font-semibold shadow-xl transition"
        @click="scrollToSection('#work')"
      >
        View Our Work
      </button>

      <button
        class="border border-white/20 px-8 py-4 rounded-full hover:border-indigo-500 hover:bg-indigo-500/10 transition"
      >
        Learn More
      </button>
    </div>

  </div>
</section>
</template>