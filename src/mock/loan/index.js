import getData from './utility'

const loan = (mock, axios, qs) => {
  // 业务管理
  let business = mock.mock({
    'List|100': [
      {
        'id|+1': 1,
        'idCard|330000-330666': 330226,
        'serviceName': '业务受理',
        'name': '@cname',
        'productName': '店主贷',
        'loanSubject': '小贷系统',
        'money|10000-100000': 10000,
        'term|1-12': 1,
        'date': '@date'
      }
    ]
  })

  axios.onGet('/business').reply(config => {
    let { page, limit, name, id, idCard } = config.params
    let data = getData(business, name, id, idCard, limit, page)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            data: {
              total: data.total,
              data: data.mockData
            }
          }
        ])
      }, 1000)
    })
  })

  // 合同管理
  let contract = mock.mock({
    'List|100': [
      {
        'id|+1': 1,
        'serviceName': '合同管理',
        'name': '@cname',
        'productName': '店主贷',
        'loanSubject': '小贷系统',
        'money|10000-100000': 10000,
        'term|1-12': 1,
        'loanMoney|10000-100000': 10000,
        'loanTerm|1-12': 1,
        'date': '@date'
      }
    ]
  })

  axios.onGet('/contract').reply(config => {
    let { page, limit, name, id, idCard } = config.params
    let data = getData(contract, name, id, idCard, limit, page)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            data: {
              total: data.total,
              data: data.mockData
            }
          }
        ])
      }, 1000)
    })
  })

  // 业务查询
  let businessQuery = mock.mock({
    'List|100': [
      {
        'id|+1': 1,
        'num|300000-800000': 1,
        'name': '@cname',
        'productName': '店主贷',
        'salesman': '@cname',
        'loanSubject': '小贷系统',
        'money|10000-100000': 10000,
        'term|1-12': 1,
        'date': '@date',
        'status': '通过',
        'newDate': '@date'
      }
    ]
  })

  axios.onGet('/businessQuery').reply(config => {
    let { page, limit, name, id, idCard } = config.params
    let data = getData(businessQuery, name, id, idCard, limit, page)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            data: {
              total: data.total,
              data: data.mockData
            }
          }
        ])
      }, 1000)
    })
  })

  // 放款申请
  let loanApply = mock.mock({
    'List|100': [
      {
        'id|+1': 1,
        'num|6000-8000': 6000,
        'name': '@cname',
        'productName': '店主贷',
        'loanSubject': '小贷系统',
        'money|10000-100000': 10000,
        'term|1-12': 1,
        'loanMoney|10000-100000': 10000,
        'loanTerm|1-12': 1,
        'date': '@date',
        'status': '签约成功'
      }
    ]
  })

  axios.onGet('/loanApply').reply(config => {
    let { page, limit, name, id, idCard } = config.params
    let data = getData(loanApply, name, id, idCard, limit, page)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            data: {
              total: data.total,
              data: data.mockData
            }
          }
        ])
      }, 1000)
    })
  })

  // 放款成功
  let loanFinish = mock.mock({
    'List|100': [
      {
        'id|+1': 1,
        'num|6000-8000': 6000,
        'name': '@cname',
        'productName': '店主贷',
        'loanSubject': '小贷系统',
        'money|10000-100000': 10000,
        'term|1-12': 1,
        'loanMoney|10000-100000': 10000,
        'loanTerm|1-12': 1,
        'date': '@date',
        'status': '放款成功'
      }
    ]
  })

  axios.onGet('/loanFinish').reply(config => {
    let { page, limit, name, id, idCard } = config.params
    let data = getData(loanFinish, name, id, idCard, limit, page)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            data: {
              total: data.total,
              data: data.mockData
            }
          }
        ])
      }, 1000)
    })
  })
}

export default loan
