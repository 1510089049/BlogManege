import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../views/main.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'start',
        component: () => import('@/views/login/index.vue'),
        redirect: '/login',
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/login/components/login.vue'),
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('@/views/login/components/register.vue'),
            }
        ]
    },
    {
        path: '/index',
        name: 'index',
        component: index,
        children: [
            {
                path: '/index/user',
                name: 'user',
                component: () => import('@/views/user/index.vue'),
            },
            {
                path: '/index/music',
                name: 'music',
                component: () => import('@/views/music/index.vue'),
                children: [
                    {
                        path: '/index/music/artist',
                        name: 'artist',
                        component: () => import('@/views/music/artist/index.vue'),
                    },
                    {
                        path: '/index/music/album',
                        name: 'album',
                        component: () => import('@/views/music/album/index.vue'),
                    },
                    {
                        path: '/index/music/musicList',
                        name: 'musicList',
                        component: () => import('@/views/music/musicList/index.vue'),
                    },
                ]
            },
            {
                path: '/index/advertising',
                name: 'advertising',
                component: () => import('@/views/advertising/index.vue'),
                children: [
                    {
                        path: '/index/advertising/launchAdvertising',
                        name: 'launchAdvertising',
                        component: () => import('@/views/advertising/launchAdvertising/index.vue'),
                    },
                    {
                        path: '/index/advertising/banner',
                        name: 'banner',
                        component: () => import('@/views/advertising/banner/index.vue'),
                    },
                ]
            },
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404.vue'),
        meta: {
            title: "404"
        }
    },
    {
        path: '*',
        redirect: '/404',
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router;
