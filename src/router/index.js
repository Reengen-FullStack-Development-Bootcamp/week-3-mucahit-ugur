import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LogsPage from '../views/LogsPage.vue'
import store from '../store'

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

router.beforeEach((to, from, next) => {
  const localLogHistory = localStorage.getItem('localLogs')
    ? JSON.parse(localStorage.getItem('localLogs'))
    : []

  const newLog = {
    date: new Date().getTime(),
    from: from.path,
    to: to.path,
    unauthorized: store.state.authType !== 'Admin',
  }

  localLogHistory.push(newLog)

  localStorage.setItem('localLogs', JSON.stringify(localLogHistory))
  next()
})

export default router
