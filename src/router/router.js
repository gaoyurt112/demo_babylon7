import * as VueRouter from 'vue-router'

const routes = [
    {
        path: '/',
        // redirect: '/home',
        component: () => import('../pages/home/index.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('../pages/home/components/home.vue'),
            },
            {
                path: 'dljc',
                name: 'dljc',
                // component: () => import('../pages/donglijiance/index.vue'),
                children: [
                    {
                        path: 'cjx',
                        name: 'cjx',
                        component: () => import('../pages/donglijiance/cjx/index.vue'),
                    },
                    {
                        path: 'ups',
                        name: 'ups',
                        component: () => import('../pages/donglijiance/ups/index.vue'),
                    },
                    {
                        path: 'dc',
                        name: 'dc',
                        component: () => import('../pages/donglijiance/dc/index.vue'),
                    },
                ]
            },
            {
                path: 'hjjc',
                name: 'hjjc',
                children: [
                    {
                        path: 'wsd',
                        name: 'wsd',
                        component: () => import('../pages/huanjingjiance/wsd/index.vue'),
                    },
                    {
                        path: 'wdyt',
                        name: 'wdyt',
                        component: () => import('../pages/huanjingjiance/wdyt/index.vue'),
                    },
                    {
                        path: 'ls',
                        name: 'ls',
                        component: () => import('../pages/huanjingjiance/ls/index.vue'),
                    },
                ]
            },
            {
                path: 'rljc',
                name: 'rljc',
                component: () => import('../pages/rongliangjiance/index.vue'),
            },
            {
                path: 'afjc',
                name: 'afjc',
                children: [
                    {
                        path: 'sp',
                        name: 'sp',
                        component: () => import('../pages/anfangjiance/sp/index.vue'),
                    },
                    {
                        path: 'mj',
                        name: 'mj',
                        component: () => import('../pages/anfangjiance/mj/index.vue'),
                    },
                    {
                        path: 'yg',
                        name: 'yg',
                        component: () => import('../pages/anfangjiance/yg/index.vue'),
                    },
                ]
            },
            {
                path: 'zcss',
                name: 'zcss',
                component: () => import('../pages/zichansousuo/index.vue'),
            },
            {
                path: 'znkz',
                name: 'znkz',
                children: [
                    {
                        path: 'jg',
                        name: 'jg',
                        component: () => import('../pages/zhinengkongzhi/jg/index.vue'),
                    },
                    {
                        path: 'gdxj',
                        name: 'gdxj',
                        component: () => import('../pages/zhinengkongzhi/gdxj/index.vue'),
                    },
                    {
                        path: 'jmkt',
                        name: 'jmkt',
                        component: () => import('../pages/zhinengkongzhi/jmkt/index.vue'),
                    },
                ]
            },
        ]
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

export default router