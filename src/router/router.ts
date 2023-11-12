import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/auth/signin', component: () => import('@/modules/auth/pages/SignInPage.vue') },
  { path: '/auth/signup', component: () => import('@/modules/auth/pages/SignUpPage.vue') },

  { path: '/profile/:username', component: () => import('@/modules/profile/pages/ProfileTournamentsPage.vue') },
  { path: '/profile/:username/tournaments', component: () => import('@/modules/profile/pages/ProfileTournamentsPage.vue') },
  { path: '/profile/:username/admin/inscriptions', component: () => import('@/modules/profile/pages/admin/ProfileInscriptionsPage.vue') },
  { path: '/profile/:username/decks', component: () => import('@/modules/profile/pages/decks/ProfileDeckPage.vue') },

  { path: '/:pathMatch(.*)*', component: () => import('@/modules/shared/pages/NotPageFound.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router