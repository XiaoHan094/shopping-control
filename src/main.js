import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import store from './store'
app.use(store)
import {router} from './router'
app.use(router)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
import * as icons from '@element-plus/icons-vue'
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})
import 'virtual:windi.css'
import 'nprogress/nprogress.css'
import './permission'
import permission from './directives/permission'
app.use(permission)
app.mount('#app')