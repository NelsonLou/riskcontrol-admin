import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
import * as api from '@/api'
import router from '@/router'
import store from '@/store'

// 配置默认接口地址
axios.defaults.baseURL = api.config.url
// 配置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 配置默认请求超时
axios.defaults.timeout = 12000

const user = JSON.parse(localStorage.getItem('user'))
if (user) {
  // 配置默认TOKEN
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
}

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(config => {
  store.commit('LOADING', true)
  // 在发送请求之前做参数序列化
  config.data = qs.stringify(config.data)
  return config
}, error => Promise.reject(error))

// TOKEN失效路由重定向(添加响应拦截器)
axios.interceptors.response.use(response => {
  store.commit('LOADING', false)
  // 用响应数据做路由重定向
  const {code, msg} = response.data
  if (code > 10090 && code < 10095) {
    store.commit('RESET_TABS') // 重置标签页
    store.commit('RESET_NAV_MENU') // 重置主导航
    store.commit('RESET_CHILD_MENU') // 重置子菜单
    router.push('/login') // 路由指向登录页
  } else if (code === 1) {
    return response
  } else {
    Message.error(msg)
  }
}, error => {
  Message.error('网络异常')
  return Promise.reject(error)
})

export default axios
