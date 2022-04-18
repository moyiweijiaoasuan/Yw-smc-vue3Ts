import { App } from 'vue'
// 引入时间转换函数
import { formatUtcString } from '@/utils/date-format'
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formtTime(value: string) {
      // 传参转换
      return formatUtcString(value)
    }
  }
}
