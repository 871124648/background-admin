import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

import userRouter from './module/user'
import adRouter from './module/ad'
import bookRouter from './module/book'
import errorRouter from './module/error'
import feedbackRouter from './module/feedback'
import noticeRouter from './module/notice'
import operateRouter from './module/operate'
import signRouter from './module/sign'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  /* 欢迎 */
  {
    path: '',
    component: Layout,
    redirect: '/welcome',
    name: 'Welcome',
    children: [{
      path: 'welcome',
      meta: { title: '首页', icon: 'example' },
      component: () => import('@/views/dashboard/index')
    }]
  }
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /* 用户 */
  userRouter,
  bookRouter,
  operateRouter,
  adRouter,
  signRouter,
  noticeRouter,
  feedbackRouter,
  errorRouter
]
