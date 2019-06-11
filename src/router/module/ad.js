import Layout from '@/views/layout/Layout'

const adRouter = {
  path: '/ad',
  component: Layout,
  redirect: '/ad/list',
  name: 'Ad',
  meta: { title: '广告管理' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/ad/list'),
      name: 'AdList',
      meta: { title: '广告配置' }
    }
  ]
}
export default adRouter
