import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LogsPage from '../views/LogsPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  { path: '/logs', name: 'LogsPage', component: LogsPage },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
