const users = (mock, axios, qs) => {
  // Mock 模拟用户数据
  let data = mock.mock({
    'users|87': [
      {
        'id': '@guid',
        'name': '@cname',
        'sex|0-2': 1,
        'age|18-60': 1,
        'birth': '@date'
      }
    ]
  })
  let Users = data.users

  // 获取用户列表
  axios.onGet('/users').reply(config => {
    let {page, limit, name} = config.params
    let mockUsers = Users.filter(user => {
      if (name && user.name.indexOf(name) === -1) {
        return false
      }
      return true
    })
    let total = mockUsers.length
    mockUsers = mockUsers.filter((u, index) => index < limit * page && index >= limit * (page - 1))
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            data: {
              total: total,
              users: mockUsers
            }
          }
        ])
      }, 1000)
    })
  })

  // 删除用户
  axios.onPost('/remove').reply(config => {
    let {id} = qs.parse(config.data)
    Users = Users.filter(u => u.id !== id)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            msg: '删除成功'
          }
        ])
      }, 500)
    })
  })

  // 批量删除用户
  axios.onPost('/batch-remove').reply(config => {
    let {id} = qs.parse(config.data)
    id = id.split(',')
    Users = Users.filter(u => !id.includes(u.id))
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            msg: '批量删除成功'
          }
        ])
      }, 500)
    })
  })

  // 编辑用户
  axios.onPost('/edit').reply(config => {
    let {id, name, sex, age, birth} = qs.parse(config.data)
    Users.some(u => {
      if (u.id === id) {
        u.name = name
        u.sex = parseInt(sex)
        u.age = parseInt(age)
        u.birth = birth
        return true
      }
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            msg: '编辑成功'
          }
        ])
      }, 500)
    })
  })

  // 新增用户
  axios.onPost('/add').reply(config => {
    let {name, sex, age, birth} = qs.parse(config.data)
    Users.push({name: name, sex: parseInt(sex), age: parseInt(age), birth: birth})
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            msg: '新增成功'
          }
        ])
      }, 500)
    })
  })
}

export default users
