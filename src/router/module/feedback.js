import Layout from '@/views/layout/Layout'

const feedbackRouter = {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/list',
    name: 'Feedback',
    meta: { title: '反馈管理' },
    children: [{
            path: 'list',
            component: () =>
                import ('@/views/feedback/feedback/list'),
            name: 'FeedbackList',
            meta: { title: '用户反馈' }
        },
        {
            path: 'recommendList',
            name: 'RecommendList',
            component: () =>
                import ('@/views/feedback/recommend/list'),
            meta: { title: '专属推荐反馈' }
        },
        {
            path: 'originList',
            name: 'originList',
            component: () =>
                import ('@/views/feedback/index'),
            meta: { title: '换源反馈' },
            children: [{
                    path: 'list',
                    component: () =>
                        import ('@/views/feedback/originlist/list'),
                    name: 'originListInit',
                    meta: { title: '换源反馈' }
                },
                {
                    path: 'detail/:recommendId',
                    name: 'originListDetail',
                    component: () =>
                        import ('@/views/feedback/originlist/detail'),
                    meta: { title: '换源详情' },
                    hidden: true
                }
            ]

        }
    ]
}
export default feedbackRouter