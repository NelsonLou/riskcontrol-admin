const businessReverify = (mock, axios, qs) => {
    let data = mock.mock({
        'business|57': [
            {
              'id': '@increment',
              'rname': '@word',
              'cname': '@word',
              'pname': '@word',
              'protype': '@word',
              'applymoney|1000-2000': 1000,
              'deadline|1-24': 1,
              'branch': '@word',
              'applytime': '@date',
              'submittime': '@date',
              'status|0-1': 1,
              'macker': '@name',
              'idcard|1000-2000': 1000,
              'cnumber|1000-2000': 1000
            }
        ]
    })

    // 赋值新变量
    let BusinessReverify = data.business

    // 业务列表数据处理
    axios.onGet('/verify-list').reply(config => {
      let {limit, page, filters} = config.params
      let MockBusiness = BusinessReverify.filter(L => {
        if (filters.name && L.cname.indexOf(filters.name) === -1) {
          return false
        }
        if (filters.idcard && L.idcard.toString().indexOf(filters.idcard.toString()) === -1) {
          return false
        }
        if (filters.cnumber && L.cnumber.toString().indexOf(filters.cnumber.toString()) === -1) {
          return false
        }
        return L
      })

      let total = MockBusiness.length
      MockBusiness = MockBusiness.filter((u, index) => {
        if (index < limit * page && index >= limit * (page - 1)) {
           return u
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            200, {
              code: 1,
              data: {
                data: MockBusiness,
                total: total
              }
            }
          ])
        }, 500)
      })
    })

  // 批量删除
  axios.onPost('/verify-remove').reply(config => {
    let id = qs.parse(config.data).params
    BusinessReverify = BusinessReverify.filter(u => !id.includes(u.id))
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
}

export default businessReverify
