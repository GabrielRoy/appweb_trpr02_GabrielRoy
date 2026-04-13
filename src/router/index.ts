import { createRouter, createWebHistory } from 'vue-router'
import Game from '../components/Game.vue'
import MainMenu from '../components/MainMenu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainMenu',
      component: MainMenu
    },
    {
      path: '/game',
      name: 'game',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Game
    }
  ]
})

export default router
