<template>
  <div id="app" :class="{ 'menu-open': isMenuOpen }">
    <!-- Navigation -->
    <nav 
  :class="[
    'fixed w-full z-50 transition-all duration-300',
    isScrolled 
      ? 'bg-slate-900/90 backdrop-blur-xl border-b border-white/10 py-4' 
      : 'bg-transparent py-6'
  ]"
>
  <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">

    <!-- Logo -->
    <div class="flex items-center text-2xl font-extrabold tracking-tight">
      <span class="bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
        STUDIO
      </span>
      <span class="text-indigo-500 text-3xl leading-none">.</span>
    </div>

    <!-- Desktop Links -->
    <div class="hidden md:flex items-center gap-10">
      <a
        v-for="(link, index) in navLinks"
        :key="index"
        :href="link.href"
        class="text-slate-400 hover:text-white transition relative group"
      >
        {{ link.label }}
        <span class="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full"></span>
      </a>

      <button
        @click="showContactModal = true"
        class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-indigo-500/50 transition"
      >
        Get in Touch
      </button>
    </div>

    <!-- Mobile Button -->
    <button class="md:hidden text-white" @click="toggleMenu">
      ☰
    </button>
  </div>
</nav>

    <!-- Hero Section -->
    <section class="hero" ref="hero">
      <div class="hero-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badge" :class="{ 'animate-in': isLoaded }">
          <span class="badge-dot"></span>
          Available for projects
        </div>
        
        <h1 class="hero-title" :class="{ 'animate-in': isLoaded }">
          <span class="title-line">We craft</span>
          <span class="title-line highlight">digital</span>
          <span class="title-line">experiences</span>
        </h1>
        
        <p class="hero-subtitle" :class="{ 'animate-in': isLoaded }">
          Transforming ideas into immersive digital realities through design, 
          technology, and strategic innovation.
        </p>
        
        <div class="hero-actions" :class="{ 'animate-in': isLoaded }">
          <button class="btn-primary" @click="scrollToSection('#work')">
            View Our Work
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </button>
          <button class="btn-secondary" @click="scrollToSection('#about')">
            Learn More
          </button>
        </div>
      </div>

      <div class="scroll-indicator" :class="{ 'hidden': isScrolled }">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-container">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="stat-item"
          :class="{ 'animate-in': statsVisible }"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="stat-number">
            <span class="counter">{{ stat.value }}</span>
            <span class="suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Work Section -->
    <section id="work" class="work-section" ref="workSection">
      <div class="section-header">
        <span class="section-tag">Selected Work</span>
        <h2 class="section-title">Featured Projects</h2>
        <p class="section-desc">Explore our latest creative endeavors</p>
      </div>

      <div class="projects-grid">
        <div 
          v-for="(project, index) in projects" 
          :key="index"
          class="project-card"
          :class="{ 'visible': projectsVisible }"
          :style="{ transitionDelay: `${index * 150}ms` }"
          @mouseenter="activeProject = index"
          @mouseleave="activeProject = null"
        >
          <div class="project-image">
            <div class="image-placeholder" :style="{ backgroundColor: project.color }">
              <span class="project-icon">{{ project.icon }}</span>
            </div>
            <div class="project-overlay" :class="{ 'active': activeProject === index }">
              <button class="view-project">View Case Study</button>
            </div>
          </div>
          <div class="project-info">
            <span class="project-category">{{ project.category }}</span>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services-section">
      <div class="services-container">
        <div class="section-header light">
          <span class="section-tag">What We Do</span>
          <h2 class="section-title">Our Services</h2>
        </div>

        <div class="services-grid">
          <div 
            v-for="(service, index) in services" 
            :key="index"
            class="service-card"
            :class="{ 'active': activeService === index }"
            @mouseenter="activeService = index"
          >
            <div class="service-icon-wrapper">
              <span class="service-icon">{{ service.icon }}</span>
            </div>
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-desc">{{ service.description }}</p>
            <ul class="service-features">
              <li v-for="(feature, fIndex) in service.features" :key="fIndex">
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section">
      <div class="testimonials-container">
        <div class="section-header">
          <span class="section-tag">Testimonials</span>
          <h2 class="section-title">Client Stories</h2>
        </div>

        <div class="testimonial-slider">
          <div class="testimonial-track" :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }">
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="testimonial-slide"
            >
              <div class="testimonial-content">
                <div class="quote-icon">"</div>
                <p class="testimonial-text">{{ testimonial.text }}</p>
                <div class="testimonial-author">
                  <div class="author-avatar" :style="{ backgroundColor: testimonial.avatarColor }">
                    {{ testimonial.initials }}
                  </div>
                  <div class="author-info">
                    <div class="author-name">{{ testimonial.name }}</div>
                    <div class="author-role">{{ testimonial.role }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="slider-controls">
            <button 
              v-for="(_, index) in testimonials" 
              :key="index"
              class="slider-dot"
              :class="{ 'active': currentTestimonial === index }"
              @click="currentTestimonial = index"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="contact-container">
        <div class="contact-content">
          <div class="section-header">
            <span class="section-tag">Get in Touch</span>
            <h2 class="section-title">Let's Create Something Amazing</h2>
            <p class="section-desc">Ready to start your next project? We'd love to hear from you.</p>
          </div>

          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <input 
                type="text" 
                v-model="form.name"
                placeholder="Your Name"
                required
                class="form-input"
              >
            </div>
            <div class="form-group">
              <input 
                type="email" 
                v-model="form.email"
                placeholder="Email Address"
                required
                class="form-input"
              >
            </div>
            <div class="form-group">
              <select v-model="form.budget" class="form-select">
                <option value="" disabled selected>Project Budget</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k+">$50,000+</option>
              </select>
            </div>
            <div class="form-group full">
              <textarea 
                v-model="form.message"
                placeholder="Tell us about your project..."
                rows="4"
                required
                class="form-input"
              ></textarea>
            </div>
            <button type="submit" class="btn-primary submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="spinner"></span>
            </button>
          </form>
        </div>

        <div class="contact-visual">
          <div class="contact-card">
            <div class="card-content">
              <h3>Start a Conversation</h3>
              <p>Whether you have a detailed brief or just a spark of an idea, we're here to help shape your vision.</p>
              <div class="contact-links">
                <a href="mailto:hello@studio.com" class="contact-link">
                  <span>hello@studio.com</span>
                </a>
                <a href="tel:+1234567890" class="contact-link">
                  <span>+1 (234) 567-890</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-top">
          <div class="footer-brand">
            <span class="logo-text">STUDIO</span>
            <span class="logo-dot">.</span>
            <p>Crafting digital experiences that inspire and engage.</p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>Navigation</h4>
              <a v-for="(link, index) in navLinks" :key="index" :href="link.href">{{ link.label }}</a>
            </div>
            <div class="link-group">
              <h4>Social</h4>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">Dribbble</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Studio. All rights reserved.</p>
          <div class="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Contact Modal -->
    <transition name="modal">
      <div v-if="showContactModal" class="modal-overlay" @click.self="showContactModal = false">
        <div class="modal-content">
          <button class="modal-close" @click="showContactModal = false">×</button>
          <h2>Let's Talk</h2>
          <p>Fill out the form below and we'll get back to you within 24 hours.</p>
          <form @submit.prevent="handleModalSubmit">
            <input type="email" placeholder="Your email" required v-model="modalEmail">
            <button type="submit" class="btn-primary">Get Started</button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Toast Notification -->
    <transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  
  data() {
    return {
      isMenuOpen: false,
      isScrolled: false,
      isLoaded: false,
      activeProject: null,
      activeService: null,
      currentTestimonial: 0,
      statsVisible: false,
      projectsVisible: false,
      showContactModal: false,
      isSubmitting: false,
      modalEmail: '',
      
      navLinks: [
        { label: 'Work', href: '#work' },
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' }
      ],
      
      stats: [
        { value: 150, suffix: '+', label: 'Projects Completed' },
        { value: 50, suffix: '+', label: 'Happy Clients' },
        { value: 12, suffix: '', label: 'Years Experience' },
        { value: 15, suffix: '+', label: 'Awards Won' }
      ],
      
      projects: [
        {
          title: 'Neon Finance',
          category: 'Fintech',
          description: 'Revolutionary banking interface with real-time data visualization',
          color: '#6366f1',
          icon: '💳'
        },
        {
          title: 'EcoTrack',
          category: 'Sustainability',
          description: 'Carbon footprint tracking app with AI-powered insights',
          color: '#10b981',
          icon: '🌱'
        },
        {
          title: 'Artisan Market',
          category: 'E-commerce',
          description: 'Curated marketplace for handcrafted goods',
          color: '#f59e0b',
          icon: '🎨'
        },
        {
          title: 'HealthHub',
          category: 'Healthcare',
          description: 'Telemedicine platform connecting patients with specialists',
          color: '#ef4444',
          icon: '🏥'
        }
      ],
      
      services: [
        {
          icon: '🎨',
          title: 'Brand Strategy',
          description: 'Comprehensive brand identity development and positioning',
          features: ['Brand Identity', 'Visual Systems', 'Brand Guidelines', 'Market Research']
        },
        {
          icon: '💻',
          title: 'Web Development',
          description: 'Custom web applications built with cutting-edge technology',
          features: ['React/Vue', 'Node.js', 'Cloud Architecture', 'API Development']
        },
        {
          icon: '📱',
          title: 'Mobile Apps',
          description: 'Native and cross-platform mobile experiences',
          features: ['iOS & Android', 'React Native', 'Flutter', 'UX Optimization']
        },
        {
          icon: '🚀',
          title: 'Digital Marketing',
          description: 'Data-driven strategies to grow your online presence',
          features: ['SEO/SEM', 'Content Strategy', 'Social Media', 'Analytics']
        }
      ],
      
      testimonials: [
        {
          text: "Studio transformed our digital presence completely. Their attention to detail and creative vision exceeded all expectations.",
          name: "Sarah Chen",
          role: "CEO, TechStart",
          initials: "SC",
          avatarColor: "#6366f1"
        },
        {
          text: "The team's ability to understand our complex requirements and deliver a seamless solution was remarkable.",
          name: "Marcus Johnson",
          role: "Director, InnovateCo",
          initials: "MJ",
          avatarColor: "#10b981"
        },
        {
          text: "Working with Studio felt like a true partnership. They cared about our success as much as we did.",
          name: "Elena Rodriguez",
          role: "Founder, GreenPath",
          initials: "ER",
          avatarColor: "#f59e0b"
        }
      ],
      
      form: {
        name: '',
        email: '',
        budget: '',
        message: ''
      },
      
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    }
  },
  
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  
  mounted() {
    // Initial load animation
    setTimeout(() => {
      this.isLoaded = true
    }, 100)
    
    // Scroll listeners
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    
    // Intersection Observer for animations
    this.initIntersectionObserver()
    
    // Auto-advance testimonials
    this.startTestimonialRotation()
  },
  
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval)
    }
  },
  
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''
    },
    
    handleScroll() {
      this.isScrolled = window.scrollY > 50
      
      // Close mobile menu on scroll
      if (this.isMenuOpen && window.scrollY > 100) {
        this.isMenuOpen = false
        document.body.style.overflow = ''
      }
    },
    
    handleResize() {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.isMenuOpen = false
        document.body.style.overflow = ''
      }
    },
    
    scrollToSection(href) {
      const element = document.querySelector(href)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
      this.isMenuOpen = false
      document.body.style.overflow = ''
    },
    
    initIntersectionObserver() {
      const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.target.classList.contains('stats-section')) {
            this.statsVisible = entry.isIntersecting
          }
          if (entry.target.classList.contains('work-section')) {
            this.projectsVisible = entry.isIntersecting
          }
        })
      }, options)
      
      const statsSection = document.querySelector('.stats-section')
      const workSection = document.querySelector('.work-section')
      
      if (statsSection) observer.observe(statsSection)
      if (workSection) observer.observe(workSection)
    },
    
    startTestimonialRotation() {
      this.testimonialInterval = setInterval(() => {
        this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length
      }, 5000)
    },
    
    handleSubmit() {
      this.isSubmitting = true
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false
        this.showToast('Message sent successfully! We\'ll be in touch soon.', 'success')
        this.form = { name: '', email: '', budget: '', message: '' }
      }, 1500)
    },
    
    handleModalSubmit() {
      this.showContactModal = false
      this.showToast('Thanks! We\'ll contact you shortly.', 'success')
      this.modalEmail = ''
    },
    
    showToast(message, type = 'success') {
      this.toast = { show: true, message, type }
      setTimeout(() => {
        this.toast.show = false
      }, 3000)
    }
  }
}
</script>

<style>
/* CSS Variables */
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --secondary: #ec4899;
  --accent: #8b5cf6;
  --dark: #0f172a;
  --light: #f8fafc;
  --gray: #64748b;
  --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--dark);
  color: var(--light);
  overflow-x: hidden;
  line-height: 1.6;
}


/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 2rem 4rem;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: var(--primary);
  top: -200px;
  right: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: var(--secondary);
  bottom: -100px;
  left: -100px;
  animation-delay: -5s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: var(--accent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  color: #a5b4fc;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.hero-badge.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
}

.title-line {
  display: block;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.title-line:nth-child(1) { transition-delay: 0.1s; }
.title-line:nth-child(2) { transition-delay: 0.2s; }
.title-line:nth-child(3) { transition-delay: 0.3s; }

.hero-title.animate-in .title-line {
  opacity: 1;
  transform: translateY(0);
}

.title-line.highlight {
  background: linear-gradient(135deg, #667eea 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease 0.4s;
}

.hero-subtitle.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease 0.5s;
}

.hero-actions.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
}

.btn-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-icon {
  transform: translate(3px, -3px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-secondary:hover {
  border-color: var(--primary);
  background: rgba(99, 102, 241, 0.1);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.scroll-indicator.hidden {
  opacity: 0;
  pointer-events: none;
}

.mouse {
  width: 26px;
  height: 40px;
  border: 2px solid #64748b;
  border-radius: 13px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 8px;
  background: #64748b;
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(12px); }
}

/* Stats Section */
.stats-section {
  padding: 6rem 2rem;
  background: linear-gradient(to bottom, var(--dark), #1e293b);
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  text-align: center;
}

.stat-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.stat-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.suffix {
  color: var(--primary);
}

.stat-label {
  color: #94a3b8;
  font-size: 1rem;
  font-weight: 500;
}

/* Work Section */
.work-section {
  padding: 8rem 2rem;
  background: #1e293b;
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;
}

.section-header.light {
  color: white;
}

.section-tag {
  display: inline-block;
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: white;
}

.section-desc {
  color: #94a3b8;
  font-size: 1.125rem;
}

.projects-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(30px);
}

.project-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.project-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  transition: transform 0.4s ease;
}

.project-card:hover .image-placeholder {
  transform: scale(1.05);
}

.project-icon {
  filter: grayscale(0.3);
  transition: filter 0.3s ease;
}

.project-card:hover .project-icon {
  filter: grayscale(0);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-overlay.active {
  opacity: 1;
}

.view-project {
  background: white;
  color: var(--dark);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.project-overlay.active .view-project {
  transform: translateY(0);
}

.project-info {
  padding: 1.5rem;
}

.project-category {
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: white;
}

.project-desc {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Services Section */
.services-section {
  padding: 8rem 2rem;
  background: var(--dark);
  position: relative;
  overflow: hidden;
}

.services-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent);
}

.services-container {
  max-width: 1400px;
  margin: 0 auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.service-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-1);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.service-card:hover::before,
.service-card.active::before {
  transform: scaleX(1);
}

.service-card:hover,
.service-card.active {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-4px);
}

.service-icon-wrapper {
  width: 60px;
  height: 60px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  transition: all 0.3s ease;
}

.service-card:hover .service-icon-wrapper {
  background: var(--primary);
  transform: scale(1.1) rotate(5deg);
}

.service-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.service-desc {
  color: #94a3b8;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.service-features li {
  color: #64748b;
  font-size: 0.9rem;
  padding-left: 1.25rem;
  position: relative;
}

.service-features li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--primary);
}

/* Testimonials */
.testimonials-section {
  padding: 8rem 2rem;
  background: linear-gradient(to bottom, var(--dark), #1e293b);
  overflow: hidden;
}

.testimonials-container {
  max-width: 1000px;
  margin: 0 auto;
}

.testimonial-slider {
  position: relative;
  margin-top: 4rem;
}

.testimonial-track {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-slide {
  min-width: 100%;
  padding: 0 1rem;
}

.testimonial-content {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 3rem;
  text-align: center;
  position: relative;
}

.quote-icon {
  font-size: 6rem;
  color: var(--primary);
  opacity: 0.2;
  position: absolute;
  top: -1rem;
  left: 2rem;
  font-family: Georgia, serif;
  line-height: 1;
}

.testimonial-text {
  font-size: 1.5rem;
  line-height: 1.6;
  color: #e2e8f0;
  margin-bottom: 2rem;
  font-weight: 500;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.author-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 1.25rem;
}

.author-info {
  text-align: left;
}

.author-name {
  font-weight: 700;
  color: white;
  font-size: 1.1rem;
}

.author-role {
  color: #64748b;
  font-size: 0.9rem;
}

.slider-controls {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.slider-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.slider-dot.active {
  background: var(--primary);
  border-color: var(--primary);
  transform: scale(1.2);
}

/* Contact Section */
.contact-section {
  padding: 8rem 2rem;
  background: var(--dark);
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.contact-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
}

.form-group.full {
  grid-column: 1 / -1;
}

.form-input,
.form-select {
  width: 100%;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-input::placeholder {
  color: #64748b;
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.25rem;
}

.form-select option {
  background: var(--dark);
  color: white;
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  grid-column: 1 / -1;
  justify-self: start;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.contact-visual {
  position: relative;
}

.contact-card {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-content h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: white;
}

.card-content p {
  color: #94a3b8;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-link:hover {
  color: var(--primary);
}

/* Footer */
.footer {
  background: #020617;
  padding: 4rem 2rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.footer-brand .logo-text {
  font-size: 2rem;
  font-weight: 800;
}

.footer-brand p {
  color: #64748b;
  margin-top: 1rem;
  max-width: 300px;
  line-height: 1.6;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-group h4 {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.link-group a {
  color: #64748b;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.link-group a:hover {
  color: white;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #64748b;
  font-size: 0.9rem;
}

.footer-legal {
  display: flex;
  gap: 2rem;
}

.footer-legal a {
  color: #64748b;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-legal a:hover {
  color: white;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.modal-content {
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #64748b;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.modal-content h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: white;
}

.modal-content p {
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.modal-content form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-content input {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
}

.modal-content input:focus {
  outline: none;
  border-color: var(--primary);
}

/* Toast */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #10b981;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 500;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 3000;
  animation: slideIn 0.3s ease;
}

.toast.error {
  background: #ef4444;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .contact-visual {
    order: -1;
  }
  
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 400px;
    height: 100vh;
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    transition: right 0.3s ease;
    padding: 2rem;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .nav-links.active {
    right: 0;
  }
  
  .nav-link {
    font-size: 1.25rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
  
  .contact-form {
    grid-template-columns: 1fr;
  }
  
  .submit-btn {
    justify-self: stretch;
  }
  
  .footer-top {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .testimonial-content {
    padding: 2rem 1.5rem;
  }
  
  .testimonial-text {
    font-size: 1.125rem;
  }
  
  .quote-icon {
    font-size: 4rem;
    top: 0;
    left: 1rem;
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
  
  .services-grid,
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>