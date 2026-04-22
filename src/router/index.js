import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/v1',
      name: 'glassmorphism',
      component: () => import('../views/V1View.vue')
    },
    {
      path: '/v2',
      name: 'minimalist',
      component: () => import('../views/V2View.vue')
    },
    {
      path: '/v3',
      name: 'brutalist',
      component: () => import('../views/V3View.vue')
    },
  ]
})

export default router
