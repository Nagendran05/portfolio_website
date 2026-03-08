<template>
  <div id="app" :class="{ 'menu-open': isMenuOpen }">
    <nav :class="['fixed w-full z-50 transition-all duration-300', isScrolled ? 'bg-slate-900/90 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6']">
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">

        <div class="flex items-center text-2xl font-extrabold tracking-tight">
          <span class="bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
            STUDIO
          </span>
          <span class="text-indigo-500 text-3xl leading-none">.</span>
        </div>

        <div class="hidden md:flex items-center gap-10">
          <a v-for="(link, index) in navLinks" :key="index":href="link.href" class="text-slate-400 hover:text-white transition relative group">
            {{ link.label }}
            <span class="absolute -bottom-1 left-0 w-0 h-2px bg-indigo-500 transition-all group-hover:w-full"></span>
          </a>

          <button @click="showContactModal = true" class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-indigo-500/50 transition">
            Get in Touch
          </button>
        </div>

        <button class="md:hidden text-white" @click="toggleMenu">
          ☰
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isScrolled: false,
        showContactModal: false,
        navLinks: [
        { label: 'Work', href: '#work' },
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' }
      ],
      };
    },
    methods: {
      toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''
    },
    handleModalSubmit() {
      this.showContactModal = false
      this.showToast('Thanks! We\'ll contact you shortly.', 'success')
      this.modalEmail = ''
    },
    },
  };

</script>