import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/best',
    name: 'Best',
    component: () => import(/* webpackChunkName: "best" */ '@/views/Best.vue'),
  },
  {
    path: '/new',
    name: 'New',
    component: () => import(/* webpackChunkName: "new" */ '@/views/New.vue'),
  },
  {
    path: '/ask',
    name: 'Ask',
    component: () => import(/* webpackChunkName: "ask" */ '@/views/Ask.vue'),
  },
  {
    path: '/show',
    name: 'Show',
    component: () => import(/* webpackChunkName: "show" */ '@/views/Show.vue'),
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import(/* webpackChunkName: "job" */ '@/views/Jobs.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
