import { createRouter, createWebHistory } from 'vue-router'

// Import components
import Home from '../pages/home.vue'
// import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router