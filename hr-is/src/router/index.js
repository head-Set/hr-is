import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    component: () => import('../views/src/index.vue')
  },
  {
    path: '/viewEmployee/:emp_id',
    component: () => import('../views/src/viewEmp.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
