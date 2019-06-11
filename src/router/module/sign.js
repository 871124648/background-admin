import Layout from '@/views/layout/Layout'

const signRouter = {
  path: '/sign',
  component: Layout,
  redirect: '/sign/list',
  name: 'Sign',
  meta: { title: '签到/等级配置' },
  children: [
    {
      path: 'signConfig',
      component: () => import('@/views/sign/signConfig/config'),
      name: 'SignConfig',
      meta: { title: '签到配置' }
    },
    {
      path: 'otherConfig',
      name: 'OtherConfig',
      component: () => import('@/views/sign/otherConfig/config'),
      meta: { title: '等级/积分/抽奖配置' }
    }
  ]
}
export default signRouter
