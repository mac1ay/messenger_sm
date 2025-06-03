import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Messenger from '../views/Messenger.vue';
import Chat from '../views/Chat.vue';
const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/messenger', component: Messenger },
    { path: '/:catchAll(.*)', redirect: '/login' },
    { path: '/chat', component: Chat},
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;