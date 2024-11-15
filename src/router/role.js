export const basicRoute = [
    {
        path: '/',
        name: 'home',
        component: () => import("@/views/home/index.vue"),
        meta: {
            title: "首页"
        },
        children: []
    },
    {
        path: '/404',
        name: '404',
        component: () => import("@/views/error/404.vue"),
        meta: {
            title: "404"
        }
    },
    {
        path: '*',
        redirect: '/404',
    }
]

// 管理员独有路由
const adminRoutes = [
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: {
            title: '用户管理',
            icon: 'el-icon-user-solid',
        },
    },
]

// 普通用户独有路由
const generalRoutes = [
    {
        path: '/music',
        name: 'music',
        component: () => import('@/views/music/index.vue'),
        redirect: '/music/artist',
        meta: {
            title: '音乐管理',
            icon: 'el-icon-headset',
        },
        children: [
            {
                path: '/music/artist',
                name: 'artist',
                component: () => import('@/views/music/artist/index.vue'),
                meta: {
                    title: '艺术家列表',
                    icon: "el-icon-star-on"
                }
            },
            {
                path: '/music/album',
                name: 'album',
                component: () => import('@/views/music/album/index.vue'),
                meta: {
                    title: '专辑列表',
                    icon: "el-icon-star-on"
                }
            },
            {
                path: '/music/musicList',
                name: 'musicList',
                component: () => import('@/views/music/musicList/index.vue'),
                meta: {
                    title: '音乐列表',
                    icon: "el-icon-star-on"
                }
            },
        ]
    },
    {
        path: '/advertising',
        name: 'advertising',
        component: () => import('@/views/advertising/index.vue'),
        redirect: '/advertising/launchAdvertising',
        meta: {
            title: '广告管理',
            icon: 'el-icon-picture-outline',
        },
        children: [
            {
                path: '/advertising/launchAdvertising',
                name: 'launchAdvertising',
                component: () => import('@/views/advertising/launchAdvertising/index.vue'),
                meta: {
                    title: '启动广告配置',
                    icon: "el-icon-star-on"
                }
            },
            {
                path: '/advertising/banner',
                name: 'banner',
                component: () => import('@/views/advertising/banner/index.vue'),
                meta: {
                    title: '轮播图配置',
                    icon: "el-icon-star-on"
                }
            },
        ]
    },
]

// 无角色独有路由
const noRoleRoutes = [
    {
        path: '/statistics',
        name: 'statistics',
        component: () => import('@/views/statistics/index.vue'),
        meta: {
            title: '数据统计',
            icon: 'el-icon-data-analysis',
        }
    },
]

// 管理员角色
export const admin = [
    ...adminRoutes,
    ...generalRoutes,
    ...noRoleRoutes
]

// 普通角色
export const general = [
    ...generalRoutes,
    ...noRoleRoutes
]

// 无角色
export const noRole = noRoleRoutes