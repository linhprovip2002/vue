import {createRouter, createWebHistory} from 'vue-router'

import LoginComponent from '../components/auth/login.vue'
import HomeComponent from '../components/default/home.vue'
// import DashboardComponent from '../components/default/dashboard.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',

        component: HomeComponent
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../components/default/dashboard.vue')

      },
      {
        path: '/auth/login',
        name: 'auth',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: LoginComponent
      },
      {
        path: '/auth/register',
        name: 'register',
        component: () => import('../components/auth/register.vue')
      }
    ]
  })
  
  export default router