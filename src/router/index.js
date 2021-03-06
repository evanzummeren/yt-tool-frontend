import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import NgramDiff from '../views/NgramDiff.vue'
import Removed from '../views/Removed.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search/q/:query/cat/:categories/sort/:sort',
    name: 'Search',
    component: Search
  },
  {
    path: '/search/q/:query/cat/:categories/sort/:sort/gte/:gte/lte/:lte',
    name: 'SearchWithEpoch',
    component: Search
  },
  {
    path: '/ngramdiff',
    name: 'Ngramdiff',
    component: NgramDiff
  },
  {
    path: '/removed',
    name: 'Removed',
    component: Removed
  },
  {
    path: '/channels/:channel',
    name: 'Channels',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Channels.vue')
  },
  {
    path: '/videos/:channel',
    name: 'Videos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Videos.vue')
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
