import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Currencies from '../views/Currencies.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Currencies',
    component: Currencies
  },
  {
    path: '/converter',
    name: 'Converter',
    component: () => import(/* webpackChunkName: "about" */ '../views/Converter.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
