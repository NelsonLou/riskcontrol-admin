// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

// mock 插件引入
// import Mock from '@/mock'
// Mock.bootstrap()

// vue-axios 插件引入
import VueAxios from 'vue-axios'
import axios from '@/api/axios'
Vue.use(VueAxios, axios)

// element-ui 完整引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// 自定义组件引入
import WkTablePaging from '@/components/TablePaging'
Vue.use(WkTablePaging)
// 自定义组件 => 基础表格
import WkTableBase from '@/components/TableBase'
Vue.use(WkTableBase)
// 自定义组件 => 基础表单
import WkFormBase from '@/components/FormBase'
Vue.use(WkFormBase)

// 自定义组件 => 表格
import WkTable from '@/components/Table'
Vue.use(WkTable)
// 自定义组件 => 表单
import WkForm from '@/components/Form'
Vue.use(WkForm)

// moment 插件引入
import moment from 'moment'
Object.defineProperty(Vue.prototype, '$moment', {value: moment})

// api 常量引入
import * as api from '@/api'
Object.defineProperty(Vue.prototype, '$api', {value: api})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App)
  // template: '<App/>',
  // components: {
  //   App
  // }
}).$mount('#app')
