import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Year2025 from '../views/Year2025.vue'
import Year2026 from '../views/Year2026.vue'
import Kaimonomemo from '../views/Kaimonomemo.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/2025',
      name: '2025',
      component: Year2025
    },
    {
      path: '/2026',
      name: '2026',
      component: Year2026
    },
    {
      path: '/kaimonomemo',
      name: 'kaimonomemo',
      component: Kaimonomemo
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPolicy
    }
  ]
})

export default router
