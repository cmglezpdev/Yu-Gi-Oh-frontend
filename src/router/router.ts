import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/auth/signin', component: () => import('@/modules/auth/pages/SignInPage.vue') },
  { path: '/auth/signup', component: () => import('@/modules/auth/pages/SignUpPage.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('@/modules/shared/pages/NotPageFound.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router