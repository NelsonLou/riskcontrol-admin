const roles = (mock, axios, qs) => {
  // Mock 模拟角色数据
  let data = mock.mock({
    'roles|10': [
      {
        'id': '@guid',
        'name': '@cname',
        'info': 'information',
        'child': [{
            'id': '@guid',
            'name': '@cname',
            'info': 'information',
            'child': [{
                'id': '@guid',
                'name': '@cname',
                'info': 'information'
              }, {
                  'id': '@guid',
                  'name': '@cname',
                  'info': 'information'
              }]
          }]
      }
    ]
  })
  let Roles = data.roles

  // 获取角色列表
  axios.onGet('/roles').reply(config => {
    let {page, limit, name} = config.params
    let mockUsers = Roles.filter(user => {
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

  // 删除角色
  axios.onPost('rRemove').reply(config => {
    let {id} = qs.parse(config.data)
    Roles = Roles.filter(u => u.id !== id)
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

  // 批量删除角色
  axios.onPost('/rBatch-remove').reply(config => {
    let {id} = qs.parse(config.data)
    id = id.split(',')
    Roles = Roles.filter(u => !id.includes(u.id))
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

  // 编辑角色
  axios.onPost('/rEdit').reply(config => {
    let {id, name, sex, age, birth} = qs.parse(config.data)
    Roles.some(u => {
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

  // 新增角色
  axios.onPost('/rAdd').reply(config => {
    let {name, sex, age, birth} = qs.parse(config.data)
    Roles.push({name: name, sex: parseInt(sex), age: parseInt(age), birth: birth})
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

export default roles
