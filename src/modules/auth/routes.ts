import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: 'auth/login'
  },
  {
    path: 'login',
    name: 'Login',
    component: () => import('./views/LoginView.vue')
  },
  {
    path: 'register',
    name: 'Register',
    component: () => import('./views/RegisterView.vue')
  }
]
