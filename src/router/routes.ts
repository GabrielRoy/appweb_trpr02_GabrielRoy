import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
      // Route par défaut
      // La route / est associé au composant PostsView. C'est ce composant qui est chargé quand l'utilisateur navigue vers la page principale de l'application.
      path: '/',
      name: 'MainMenu',
      component: () => import('../views/MainMenuView.vue')
    },
    {
      // Route de page "à propos"
      // Un import dynamique permet de charger un composant uniquement quand il est nécessaire. Si l'utilisateur n'a pas besoin de la page About, alors le composant AboutView ne sera pas chargé. Cela permet d'optimiser le temps de chargement de l'application.
      path: '/game',
      name: 'Game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: () => import('../views/LeaderboardView.vue')
    }
  ]
  
  export default routes