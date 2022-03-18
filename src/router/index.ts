import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Resume from '@/components/resume/views/Resume.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
