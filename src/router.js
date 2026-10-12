import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        component: () => import('/src/shared/presentation/components/layout.vue')
        //component: () => import('../stations/presentation/views/home.view.vue')
    },
    {
        path: '/weather/reports/new',
        component: () => import('/src/shared/presentation/components/layout.vue')
        //component: () => import('../stations/presentation/views/new-weather-report.view.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('/src/shared/presentation/components/layout.vue')
        //component: () => import('../shared/components/page-not-found.component.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;