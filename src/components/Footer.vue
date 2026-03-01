<template>
  <footer class="portfolio-footer">
    <!-- Main Footer Content -->
    <div class="footer-main">
      <div class="footer-container">
        <!-- Brand Column -->
        <div class="footer-brand">
          <h3 class="brand-name">{{ name }}</h3>
          <p class="brand-tagline">{{ tagline }}</p>
          <div class="social-links">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="social-icon" />
            </a>
          </div>
        </div>

        <!-- Quick Links Column -->
        <div class="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li v-for="link in quickLinks" :key="link.id">
              <a :href="link.href" @click.prevent="scrollToSection(link.href)">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Column -->
        <div class="footer-contact">
          <h4>Get In Touch</h4>
          <ul>
            <li>
              <a :href="`mailto:${email}`">
                <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {{ email }}
              </a>
            </li>
            <li v-if="phone">
              <a :href="`tel:${phone}`">
                <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {{ phone }}
              </a>
            </li>
            <li v-if="location">
              <span>
                <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ location }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="footer-container">
        <p class="copyright">
          &copy; {{ currentYear }} {{ name }}. All rights reserved.
        </p>
        <p class="credits">
          Made with <span class="heart">♥</span> using Vue.js
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
// SVG Icon Components
const GitHubIcon = {
  template: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
}

const LinkedInIcon = {
  template: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
}

const TwitterIcon = {
  template: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
}

const DribbbleIcon = {
  template: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm10.01-10.679c-.348-.112-3.143-.943-6.318-.433 1.326 3.639 1.866 6.601 1.969 7.221 2.269-1.542 3.893-4.008 4.349-6.788zm-6.015 7.691c-.146-.875-.771-4.037-2.225-7.844-.021.006-.042.012-.062.019-5.883 2.052-7.991 6.132-8.185 6.519 1.771 1.38 4.001 2.212 6.427 2.212 1.359 0 2.659-.284 3.845-.803zm-10.725-2.171c.255-.437 3.205-5.287 8.938-7.086.143-.046.286-.089.429-.128-.275-.621-.572-1.242-.881-1.853-5.466 1.638-10.77 1.569-11.246 1.556-.003.115-.005.231-.005.348 0 2.923 1.109 5.589 2.928 7.608.251-.151.518-.289.837-.445zm-2.598-9.213c.495.009 5.032.056 10.005-1.34-1.793-3.186-3.729-5.867-4.018-6.262-3.628 1.71-6.323 5.166-6.987 9.602zm8.773-10.064c.305.409 2.267 3.089 4.042 6.343 3.857-1.449 5.495-3.646 5.72-3.975-2.163-1.918-5.021-3.089-8.152-3.089-.543 0-1.072.051-1.588.148-.007.191-.016.379-.022.573zm12.308 4.522c-.284.383-2.086 2.714-6.127 4.41.256.525.501 1.058.732 1.599.082.192.162.383.239.576 3.66-.462 7.296.294 7.656.37-.021-2.434-.906-4.658-2.289-6.419-.069.155-.143.309-.211.464z"/></svg>`
}

export default {
  name: 'PortfolioFooter',

  components: {
    GitHubIcon,
    LinkedInIcon,
    TwitterIcon,
    DribbbleIcon
  },

  props: {
    name: {
      type: String,
      default: 'Your Name'
    },
    tagline: {
      type: String,
      default: 'Building digital experiences that matter.'
    },
    email: {
      type: String,
      default: 'hello@example.com'
    },
    phone: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    githubUrl: {
      type: String,
      default: ''
    },
    linkedinUrl: {
      type: String,
      default: ''
    },
    twitterUrl: {
      type: String,
      default: ''
    },
    dribbbleUrl: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      quickLinks: [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'about', label: 'About', href: '#about' },
        { id: 'projects', label: 'Projects', href: '#projects' },
        { id: 'skills', label: 'Skills', href: '#skills' },
        { id: 'contact', label: 'Contact', href: '#contact' }
      ]
    }
  },

  computed: {
    currentYear() {
      return new Date().getFullYear()
    },

    socialLinks() {
      const links = []
      if (this.githubUrl) {
        links.push({ name: 'GitHub', url: this.githubUrl, icon: 'GitHubIcon' })
      }
      if (this.linkedinUrl) {
        links.push({ name: 'LinkedIn', url: this.linkedinUrl, icon: 'LinkedInIcon' })
      }
      if (this.twitterUrl) {
        links.push({ name: 'Twitter', url: this.twitterUrl, icon: 'TwitterIcon' })
      }
      if (this.dribbbleUrl) {
        links.push({ name: 'Dribbble', url: this.dribbbleUrl, icon: 'DribbbleIcon' })
      }
      return links
    }
  },

  methods: {
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
    }
  }
}
</script>

<style scoped>
.portfolio-footer {
  background: #1a1a2e;
  color: #fff;
}

.footer-main {
  padding: 4rem 0 3rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: 4rem;
}

/* Brand Column */
.footer-brand .brand-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  color: #fff;
}

.footer-brand .brand-tagline {
  font-size: 0.95rem;
  color: #a0a0b8;
  margin: 0 0 1.5rem;
  line-height: 1.6;
  max-width: 280px;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #4361ee;
  transform: translateY(-3px);
}

.social-icon {
  width: 20px;
  height: 20px;
  fill: #fff;
}

/* Links Column */
.footer-links h4,
.footer-contact h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1.25rem;
  color: #fff;
}

.footer-links ul,
.footer-contact ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-links li,
.footer-contact li {
  margin-bottom: 0.75rem;
}

.footer-links a,
.footer-contact a,
.footer-contact span {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #a0a0b8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover,
.footer-contact a:hover {
  color: #4361ee;
}

.contact-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* Bottom Bar */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.5rem 0;
}

.footer-bottom .footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-template-columns: none;
  gap: 0;
}

.copyright,
.credits {
  font-size: 0.85rem;
  color: #6b6b8a;
  margin: 0;
}

.heart {
  color: #e74c3c;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Responsive */
@media (max-width: 900px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }

  .footer-brand .brand-tagline {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .footer-main {
    padding: 3rem 0 2rem;
  }

  .footer-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 0 1.5rem;
  }

  .footer-bottom .footer-container {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>