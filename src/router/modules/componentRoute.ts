import Layout from '@/layout/index.vue'
import { RouteConfig } from 'vue-router'

const componentRouter: RouteConfig = {
  path: '/demo',
  name: 'Demo',
  meta: { title: 'component-demo', icon: 'component' },
  component: Layout,
  redirect: '/demo/queryTable',
  children: [
    {
      path: 'queryTable',
      name: 'QueryTable',
      component: () => import(/* webpackChunkName: "queryTable" */ '@/views/component-demo/queryTable.vue'),
      meta: { title: '搜索表格', icon: 'table' },
    },
  ],
}

export default componentRouter
