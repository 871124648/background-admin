import Layout from '@/views/layout/Layout'

const noticeRouter = {
  path: '/notice',
  component: Layout,
  redirect: '/notice/list',
  name: 'Notice',
  meta: { title: '公告/推送管理' },
  children: [
    {
      path: 'noticeList',
      component: () => import('@/views/notice/notice/list'),
      name: 'NoticeList',
      meta: { title: '公告管理' }
    },
    {
      path: 'pushList',
      name: 'PushList',
      component: () => import('@/views/notice/push/list'),
      meta: { title: '推送管理' }
    }
  ]
}
export default noticeRouter
