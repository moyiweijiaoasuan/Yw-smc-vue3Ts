import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'
let firstMenu: any = null
export function mapMenusRoute(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 先去加载默认的所有的routes，
  // 1创建一个存储数组
  const allRoutes: RouteRecordRaw[] = []
  // 2.wapback里require.context()加载某个文件夹
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    // 拿到所有的路由对象
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 根据菜单获取需要的routes，muens:这是传过来的 userMenus，type的序号来鉴定他的权重
  const _recurseGetRoute = (muens: any[]) => {
    for (const muen of muens) {
      if (muen.type === 2) {
        const route = allRoutes.find((route) => route.path === muen.url)
        if (route) routes.push(route)

        if (!firstMenu) {
          firstMenu = muen
        }
      } else {
        _recurseGetRoute(muen.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  // console.log(routes)
  return routes
}
// 拿到第一层级的name
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  // 声明一个数组传入name和path
  const breadcrumbs: IBreadcrumb[] = []
  // 调用下方函数获取menu里面的name
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
// 拿userMenus的id
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // 第一层级name
        breadcrumbs?.push({ name: menu.name })
        // 第二层级name
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPrmissions(userMenus: any[]) {
  const Prmissions: string[] = []
  const _recurGetPrmissions = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurGetPrmissions(menu.children ?? [])
      } else if (menu.type === 3) {
        Prmissions.push(menu.permission)
      }
    }
  }
  _recurGetPrmissions(userMenus)
  return Prmissions
}

export function getMenuLeafKeys(menuList: any) {
  const leftKeys: number[] = []
  const _recurseGetLeaf = (menuList: any) => {
    for (const menu of menuList) {
      if (menu.childern) {
        _recurseGetLeaf(menu.childern)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}
export { firstMenu }
