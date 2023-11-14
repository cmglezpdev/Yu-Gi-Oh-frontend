import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/auth',
    component: () => import('@/modules/auth/Auth.vue'),
    children: [
      { path: 'signin', component: () => import('@/modules/auth/pages/SignInPage.vue') },
      { path: 'signup', component: () => import('@/modules/auth/pages/SignOutPage.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('@/modules/layout/Layout.vue'),
    children: [
      {
        path: 'my-decks',
        children: [
          {
            path: ':id',
            component: () => import('@/modules/user-data/Decks.vue'),
            children: [
              {
                path: 'general',
                component: () => import('@/modules/user-data/DecksGeneral.vue')
              },
              {
                path: 'table',
                component: () => import('@/modules/user-data/DecksTable.vue')
              }
            ]
          }
        ]
      },
      {
        path: 'my-tournaments',
        children: [
          {
            path: ':id',
            component: () => import('@/modules/user-tournaments/TournamentInfo.vue'),
            children: [
              {
                path: 'aprobed',
                component: () => import('@/modules/user-tournaments/aprobed/AprobedTable.vue')
              },
              {
                path: 'past',
                component: () => import('@/modules/user-tournaments/past/PastTable.vue')
              },
              {
                path: 'rejected',
                component: () => import('@/modules/user-tournaments/rejected/RejectedTable.vue')
              },
              {
                path: 'pending',
                component: () => import('@/modules/user-tournaments/pending/PendingTable.vue')
              },
            ]
          }
        ]
      },
      {
        path: 'my-stadistics',
        children: [
          {
            path: ':id',
            component: () => import('@/modules/stadistics/Stadistics.vue'),
          }
        ]
      }
    ]
  },
  { path: '/:pathMatch(.*)*', component: () => import('@/modules/shared/pages/NotPageFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
