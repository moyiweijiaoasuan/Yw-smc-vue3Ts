// 缓存工作位置
// 定义一个类，
class LocalCache {
  setCache(key: string, value: any) {
    // localStorage作为本地存储来使用的
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      // 返回一个转换成对象的值
      return JSON.parse(value)
    }
  }
  // 退出登录使用
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  // 这里是清空。所以不需要传值。
  creaRCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
