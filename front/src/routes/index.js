import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Chat from '../components/Chat.vue';
const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/chat', component: Chat },
    { path: '/:catchAll(.*)', redirect: '/login' }, // Новый способ для "catch-all" маршрута
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;