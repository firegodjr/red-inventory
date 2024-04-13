import { createRouter, createWebHistory } from 'vue-router'
import App from '../views/App.vue'
import login from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/inventories'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/inventories',
      name: 'inventories',
      component: () => import('../views/inventoriesPage.vue')
    },
    {
      path: '/crews',
      name: 'crews',
      component: () => import('../views/crewsPage.vue')
    },
    {
      path: '/architectures',
      name: 'architectures',
      component: () => import('../views/architecturesPage.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/accountPage.vue')
    }
  ]
})

export default router
