import { App } from 'vue'
import * as Elicon from '@element-plus/icons-vue'

export default function (app: App): void {
  for (const iconName in Elicon) {
    app.component(iconName, (Elicon as any)[iconName])
  }
}
