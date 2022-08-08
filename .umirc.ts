import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {
    loading: '@/pages/loading/Loading',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  favicon:'/favicon.ico',
  proxy: {
    '/api': {
      // 'target': 'http://localhost:8005/',
      // 'pathRewrite': { '^/api' : '/api' },
      'target': 'http://119.3.187.151:8005/',
      'pathRewrite': { '^/api' : '/' },
    },
  },
  routes: [
    { path: '/', component: '@/pages/index',title:'第二届鲁辩齐思辩论赛'},
    { path: '/help', component: '@/pages/help',title:'系统使用指南'},
    { path: '/try', component: '@/pages/try',title:'系统赛果单体验'},
    { path: '/login', component: '@/pages/Login/Login.tsx',title:'登录'},
    { path: '/schedule', component: '@/pages/schedule/index',title:'鲁辩 赛程安排',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/team', component: '@/pages/teams/index',title:'鲁辩 队伍筛选',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/personnel', component: '@/pages/personnel/index',title:'鲁辩 对阵',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/work', component: '@/pages/work/index',title:'鲁辩 人员安排',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/statistics', component: '@/pages/statistics/index',title:'鲁辩 赛果',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/m-back', component: '@/pages/backmobile/Mobile',title:'鲁辩 赛果(备用)',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/back', component: '@/pages/BackDetail/index',title:'鲁辩 赛果单(备用)',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/vj/questionnaire', component: '@/pages/results/questionnaire/index', title: "赛果收集" },
    { path: '/vj/success', component: '@/pages/results/success/success.tsx', title: "提交成功" },
  ],
  fastRefresh: {},
  mfsu: {},
});
