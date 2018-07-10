import axios from '@/api/axios'
import * as api from '@/api'
import {Message} from 'element-ui'

const state = {
  loading: false,
  overdue_show: false,
  navMenu: JSON.parse(localStorage.getItem('navMenu')) || [],
  navActive: localStorage.getItem('navActive') || 'loan',
  childMenu: JSON.parse(localStorage.getItem('childMenu')) || [],
  menuActive: localStorage.getItem('menuActive') || '',
  menuOpened: localStorage.getItem('menuOpened') || '',
  tabs: JSON.parse(localStorage.getItem('tabs')) || []
}

const getters = {
  getLoading: state => state.loading,
  getOverdue_show: state => state.overdue_show,
  getNavMenu: state => state.navMenu,
  getNavActive: state => state.navActive,
  getChildMenu: state => state.childMenu,
  getMenuActive: state => state.menuActive,
  getMenuOpened: state => state.menuOpened,
  getTabs: state => state.tabs
}

const mutations = {
  // 加载状态
  LOADING: (state, status) => {
    state.loading = status
  },
  // 获取导航菜单
  NAV_MENU: (state, data) => {
    state.navMenu = data
    localStorage.setItem('navMenu', JSON.stringify(data))
  },
  // 获取子菜单
  CHILD_MENU: (state, data) => {
    state.childMenu = data
    localStorage.setItem('childMenu', JSON.stringify(data))
  },
  // 激活主菜单
  ACTIVE_NAV_MENU: (state, data) => {
    state.navActive = data
    localStorage.setItem('navActive', data)
  },
  // 打开子菜单
  OPEN_CHILD_MENU: (state, data) => {
    state.menuOpened = data
    localStorage.setItem('menuOpened', data)
  },
  // 关闭子菜单
  CLOSE_CHILD_MENU: (state) => {
    state.menuOpened = ''
    localStorage.removeItem('menuOpened')
  },
  // 激活子菜单
  ACTIVE_CHILD_MENU: (state, data) => {
    state.menuActive = data
    localStorage.setItem('menuActive', data)
  },
  // 重置主菜单
  RESET_NAV_MENU: () => {
    localStorage.removeItem('navMenu')
    localStorage.removeItem('navActive')
    localStorage.removeItem('childMenu')
  },
  // 重置子菜单
  RESET_CHILD_MENU: (state) => {
    state.menuActive = ''
    state.menuOpened = ''
    localStorage.removeItem('menuActive')
    localStorage.removeItem('menuOpened')
  },
  // 添加标签页
  ADD_TABS: (state, route) => {
    if (state.tabs.some(v => v.path === route.path) || route.path === '/dashboard') {
      return
    }
    state.tabs.push({name: route.name, path: route.path})
    localStorage.setItem('tabs', JSON.stringify(state.tabs))
  },
  // 删除标签页
  DEL_TABS: (state, path) => {
    state.tabs = state.tabs.filter(tab => tab.path !== path)
    localStorage.setItem('tabs', JSON.stringify(state.tabs))
  },
  // 重置标签页
  RESET_TABS: (state) => {
    state.tabs = []
    localStorage.removeItem('tabs')
  }
}

const actions = {
  // 获取导航菜单
  handleNavMenu: ({commit}) => {
    axios.get(api.system.navMenu).then(res => {
      const {code, msg, data} = res.data
      if (code === 1) {
        commit('NAV_MENU', data)
        const childMenu = data.filter(obj => obj.path === 'loan')[0].children
        commit('CHILD_MENU', childMenu)
      } else {
        Message.error(msg)
      }
    }).catch(error => {
      console.log(error)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
