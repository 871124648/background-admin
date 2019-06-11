import Layout from '@/views/layout/Layout'

const operateRouter = {
  path: '/operate',
  component: Layout,
  redirect: '/operate/book',
  name: 'Operate',
  meta: { title: '运营管理' },
  children: [
    {
      path: 'recommend',
      component: () => import('@/views/operate/index'),
      name: 'Recommend',
      meta: { title: '书籍推荐' },
      children: [
        {
          path: 'list',
          component: () => import('@/views/operate/recommend/list'),
          name: 'RecommendBookList',
          meta: { title: '书籍推荐' }
        },
        {
          path: 'detail/:recommendId',
          name: 'RecommendBookListDetail',
          component: () => import('@/views/operate/recommend/detail'),
          meta: { title: '编辑推荐' },
          hidden: true
        }
      ]
    },
    {
      path: 'bannerList',
      name: 'BannerList',
      component: () => import('@/views/operate/banner/list'),
      meta: { title: 'banner管理' }
    }
  ]
}
export default operateRouter
