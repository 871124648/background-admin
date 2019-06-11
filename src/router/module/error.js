import Layout from '@/views/layout/Layout'

const errorRouter = {
  path: '/error',
  component: Layout,
  redirect: '/error/list',
  name: 'Error',
  meta: { title: '崩溃日志' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/error/list'),
      name: 'ErrorList',
      meta: { title: '崩溃日志' }
    }
  ]
}
export default errorRouter
