import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import DetectImage from './pages/DetectImage.vue';
import DetectVideo from './pages/DetectVideo.vue';

const routes = [
    { name: "home", path: '/', component: HomePage },
    { name: "image", path: '/image', component: DetectImage },
    { name: "video", path: '/video', component: DetectVideo },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
