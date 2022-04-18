import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import { globalRegister } from './global'

// import ywRequest from './service'
import ElementPlus from 'element-plus'
// import sede from 'ele'
// import icons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(store)
setupStore()
app.use(router)
app.use(ElementPlus)
app.use(globalRegister)
app.mount('#app')
