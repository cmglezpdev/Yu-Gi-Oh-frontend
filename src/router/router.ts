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
              {
                path: 'pick',
                component: () => import('@/modules/user-tournaments/pick/PickTable.vue')
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
      },
      {
        path: 'admin',
        children: [
          {
            path: 'users',
            component: () => import('@/modules/admin_panel/usersTable.vue'),
          },
          {
            path: 'stadistics',
            component: () => import('@/modules/admin_panel/Stadistics.vue'),
          },
          {
            path: 'tournaments',
            children: [
              {
                path: '',
                component: () => import('@/modules/admin_panel/TournamentAdminTable.vue'),
              },
              {
                path: ':id',
                component: () => import('@/modules/admin_panel/ManageTournament.vue'),
              }
            ]
          },
          {
            path: 'inscriptions',
            children: [
              {
                path: '',
                component: () => import('@/modules/admin_panel/TournamentAdminTable.vue'),
              },
              {
                path: ':id',
                component: () => import('@/modules/admin_panel/ManageTournament.vue'),
              }
            ]
          }
        ]
      }
    ]
  },

  { path: '/profile/:username', component: () => import('@/modules/profile/pages/ProfileTournamentsPage.vue') },
  { path: '/profile/:username/tournaments', component: () => import('@/modules/profile/pages/ProfileTournamentsPage.vue') },
  { path: '/profile/:username/admin/inscriptions', component: () => import('@/modules/profile/pages/admin/ProfileInscriptionsPage.vue') },
  { path: '/profile/:username/decks', component: () => import('@/modules/profile/pages/decks/ProfileDeckPage.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('@/modules/shared/pages/NotPageFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
