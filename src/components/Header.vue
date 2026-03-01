<template>
  <header class="portfolio-header" :class="{ 'scrolled': isScrolled }">
    <div class="header-container">
      <!-- Logo / Name -->
      <div class="logo">
        <a href="#" @click.prevent="scrollToTop">
          {{ name }}
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <ul class="nav-list">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="item.href"
              :class="{ 'active': activeSection === item.id }"
              @click.prevent="scrollToSection(item.href)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- CTA Button -->
      <div class="header-actions">
        <a
          :href="ctaLink"
          class="cta-button"
          @click.prevent="scrollToSection(ctaLink)"
        >
          {{ ctaText }}
        </a>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        class="menu-toggle"
        :class="{ 'active': isMobileMenuOpen }"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <transition name="slide-down">
      <nav v-if="isMobileMenuOpen" class="mobile-nav">
        <ul class="mobile-nav-list">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="item.href"
              :class="{ 'active': activeSection === item.id }"
              @click.prevent="scrollToSection(item.href)"
            >
              {{ item.label }}
            </a>
          </li>
          <li>
            <a
              :href="ctaLink"
              class="mobile-cta"
              @click.prevent="scrollToSection(ctaLink)"
            >
              {{ ctaText }}
            </a>
          </li>
        </ul>
      </nav>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'PortfolioHeader',

  props: {
    name: {
      type: String,
      default: 'Your Name'
    },
    ctaText: {
      type: String,
      default: 'Contact Me'
    },
    ctaLink: {
      type: String,
      default: '#contact'
    }
  },

  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false,
      activeSection: 'home',
      navItems: [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'about', label: 'About', href: '#about' },
        { id: 'projects', label: 'Projects', href: '#projects' },
        { id: 'skills', label: 'Skills', href: '#skills' }
      ]
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    this.observeSections()
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },

    handleResize() {
      if (window.innerWidth > 768) {
        this.isMobileMenuOpen = false
      }
    },

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.activeSection = 'home'
      this.isMobileMenuOpen = false
    },

    scrollToSection(href) {
      const targetId = href.replace('#', '')
      const element = document.getElementById(targetId)

      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }

      this.activeSection = targetId
      this.isMobileMenuOpen = false
    },

    observeSections() {
      const options = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id
          }
        })
      }, options)

      this.navItems.forEach(item => {
        const section = document.getElementById(item.id)
        if (section) {
          observer.observe(section)
        }
      })
    }
  }
}
</script>

<style scoped>
.portfolio-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: all 0.3s ease;
  padding: 1rem 0;
}

.portfolio-header.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  padding: 0.75rem 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo a:hover {
  color: #4361ee;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2.5rem;
}

.nav-list a {
  font-size: 0.95rem;
  font-weight: 500;
  color: #4a4a68;
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-list a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #4361ee;
  transition: width 0.3s ease;
}

.nav-list a:hover,
.nav-list a.active {
  color: #4361ee;
}

.nav-list a:hover::after,
.nav-list a.active::after {
  width: 100%;
}

/* CTA Button */
.cta-button {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  background: #4361ee;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #3651d4;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
}

/* Mobile Menu Toggle */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background: #1a1a2e;
  transition: all 0.3s ease;
  transform-origin: center;
}

.menu-toggle.active .hamburger-line:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.menu-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .hamburger-line:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
  background: #fff;
  border-top: 1px solid #eee;
  padding: 1rem 0;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.mobile-nav-list a {
  display: block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #4a4a68;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-nav-list a:hover,
.mobile-nav-list a.active {
  color: #4361ee;
  background: rgba(67, 97, 238, 0.08);
}

.mobile-cta {
  background: #4361ee !important;
  color: #fff !important;
  margin-top: 0.5rem;
}

.mobile-cta:hover {
  background: #3651d4 !important;
}

/* Slide Animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .desktop-nav,
  .header-actions {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .mobile-nav {
    display: block;
  }

  .header-container {
    padding: 0 1.5rem;
  }
}
</style>