import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.VUE_APP_SRC,
  routes: [
    {
      path: '/',
      name: 'app',
      redirect: '/common'
    },
    {
      path: '*',
      name: 'notFound',
      redirect: '/common'
    },
    {
      path: '/common',
      name: 'common',
      component: () => import(/* webpackChunkName: "fillIn" */ '@/views/common/Template.vue'),
      // redirect: {name: 'entrance'}
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

router.beforeResolve((to, from, next) => {
  next()
})

router.afterEach((to, from) => {

})

export default router
