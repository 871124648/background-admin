import Layout from '@/views/layout/Layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  name: 'User',
  meta: { title: '用户管理' },
  children: [
    {
      path: 'userManage',
      component: () => import('@/views/user/index'),
      name: 'UserManage',
      meta: { title: '用户管理' },
      children: [
        {
          path: 'list',
          name: 'UserList',
          component: () => import('@/views/user/list/list'),
          meta: { title: '用户列表' }
        },
        {
          path: 'detail/:userId(\\d+)',
          name: 'UserDetail',
          component: () => import('@/views/user/detail/detail'),
          meta: { title: '用户详情' },
          hidden: true
        }
      ]
    }
  ]
}
export default userRouter
