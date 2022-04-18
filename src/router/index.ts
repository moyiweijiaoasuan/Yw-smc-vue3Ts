import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import LocalCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { mapMenusRoute } from '@/utils/map-menus'
import store from '@/store'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/main.vue')
    // 根据userMunes决定加载的路由数量
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCache.getCache('token')
    if (!token) {
      return '/login'
    }

    const userMenus = (store.state as any).login.userMenus
    const routes = mapMenusRoute(userMenus)

    // 做子路由的映射
    routes.forEach((route) => {
      router.addRoute('main', route)
    })
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
