const users = (mock, axios, qs) => {
  // Mock 模拟用户数据
  let data = mock.mock({
    'users|100': [
      {
        'id': '@guid',
        'customerName': '宁波分部',
        'sex|0-2': 1,
        'age|18-60': 1,
        'loanDate': '@date',
        'collectionLot|0-31': 1,
        'name': '@cname',
        'productType': '助业贷',
        'contractAmount|10000-1000000': 1,
        'appropriationAmount|10000-1000000': 1,
        'loanAmount|10000-1000000': 1,
        'loanTerm|1-24': 1,
        'interest|100-10000': 1,
        'residualPrincipal|10000-1000000': 1,
        'currentPeriod|1-24': 1,
        'expectedNumber|1-24': 1,
        'overdueNumber|1-24': 1,
        'outstandingNumber|1-24': 1,
        'overdueDays|1-365': 1,
        'nowInterest|100-10000': 1,
        'lateFee|1-1000': 1,
        'nowRepayment|1000-1000000': 1,
        'nowShould|1000-1000000': 1,
        'maritalStatus|1-2': 1,
        'education|0-2': 1,
        'jobLevel': '法人',
        'unitAttribute': '私人',
        'salesman': '@cname'
      }
    ],
    'address|20': [
      {
        'id': '@increment',
        'addressName': '@cname'
      }
    ]
  })
  let Users = data.users
  let address = data.address

  // 获取用户列表
  axios.onGet('/overdueUser').reply(config => {
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

  // 获取部门选项
   axios.onGet('/addressName').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            data: {
              address: address
            }
          }
        ])
      }, 1000)
    })
  })
}

export default users
