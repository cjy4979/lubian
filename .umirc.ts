import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/Login/Login.tsx',titel:'登录'},
    { path: '/schedule', component: '@/pages/schedule/index',title:'深语10.0 赛程安排'},
    { path: '/team', component: '@/pages/teams/index',title:'深语10.0 队伍筛选'},
    { path: '/personnel', component: '@/pages/personnel/index',titel:'深语10.0 上场人员'},
    { path: '/work', component: '@/pages/work/index',titel:'深语10.0 人员安排'},
    { path: '/statistics', component: '@/pages/statistics/index',title:'深语10.0 赛果'},
    { path: '/back', component: '@/pages/BackDetail/index',title:'深语10.0 赛果单(备用)'},
    { path: '/vj/questionnaire', component: '@/pages/results/questionnaire/index', title: "赛果收集" },
    { path: '/vj/success', component: '@/pages/results/success/success.tsx', title: "提交成功" },
  ],
  fastRefresh: {},
  mfsu: {},
});
