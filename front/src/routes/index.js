import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Messenger from '../views/Messenger.vue';
const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/messenger', component: Messenger },
    { path: '/:catchAll(.*)', redirect: '/login' },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;