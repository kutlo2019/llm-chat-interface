import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authRoutes } from '@/modules/auth/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/chat/:prompt',
      name: 'Chat',
      component: () => import(/* webpackChunkname: "chat" */ '../views/ChatView.vue')
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import(/* webpackChunkname: "auth" */ '../modules/auth/AuthModule.vue'),
      children: [...authRoutes]
    }
  ]
})

export default router
