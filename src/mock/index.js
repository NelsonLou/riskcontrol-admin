import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
import mo from 'mockjs'
import menus from '@/mock/menus'
const ax = new MockAdapter(axios)
// 用户管理模块
import users from '@/mock/system/users'

// 还原原始的 adapter（移除模拟行为）
// ax.restore()

const bootstrap = () => {
  // 用户登录信息
  const LoginUsers = [
    {
      id: 1,
      username: 'admin',
      password: 'wk12345',
      name: '火云邪神'
    }
  ]

  // 用户登录
  ax.onPost('/login').reply(config => {
    let {username, password} = qs.parse(config.data)
    return new Promise((resolve, reject) => {
      let user = null
      setTimeout(() => {
        let hasUser = LoginUsers.some(u => {
          if (u.username === username && u.password === password) {
            user = u
            // user.password = undefined
            return true
          }
        })
        if (hasUser) {
          resolve([
            200, {
              'code': 1,
              'msg': '登录成功',
              'data': user
            }
          ])
        } else {
          resolve([
            200, {
              code: 500,
              msg: '账号或密码错误'
            }
          ])
        }
      }, 1000)
    })
  })

  // 用户退出
  ax.onPost('/logout').reply(config => {
    return new Promise((resolve, reject) => {
      resolve([
        200, {
          code: 1,
          msg: '退出成功'
        }
      ])
    })
  })

  // 导航菜单
  menus(ax)
  // 用户管理（CRUD）
  users(mo, ax, qs)
}

export default {
  bootstrap
}
