import Layout from '@/views/layout/Layout'

const bookRouter = {
  path: '/book',
  component: Layout,
  redirect: '/book/list',
  name: 'Book',
  meta: { title: '书籍管理' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/book/list/list'),
      name: 'BookList',
      meta: { title: '书籍列表' }
    },
    {
      path: 'bookList',
      name: 'BookListManage',
      component: () => import('@/views/book/index'),
      meta: { title: '书单列表' },
      children: [
        {
          path: 'list',
          name: 'BookListList',
          component: () => import('@/views/book/bookList/list'),
          meta: { title: '书单列表' }
        },
        {
          path: 'detail/:bookListId',
          name: 'BookListDetail',
          component: () => import('@/views/book/bookList/detail'),
          meta: { title: '书单详情' },
          hidden: true
        }
      ]
    }
  ]
}
export default bookRouter
