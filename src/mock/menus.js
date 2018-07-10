import {Menus, Loan, Risk, AfterLoan, Product, Report, System} from '@/mock/menusData'

const menus = (axios) => {
  // 获取主导航菜单
  axios.onGet('/nav-menu').reply(config => {
    return new Promise((resolve, reject) => {
      resolve([
        200, {
          code: 1,
          data: {
            menus: Menus
          }
        }
      ])
    })
  })

  // 获取(贷款管理)菜单
  axios.onGet('/loan').reply(config => {
    return new Promise((resolve, reject) => {
      resolve([
        200, {
          code: 1,
          data: {
            menus: Loan
          }
        }
      ])
    })
  })

  // 获取(风控管理)菜单
  axios.onGet('/risk').reply(config => {
    return new Promise((resolve, reject) => {
      resolve([
        200, {
          code: 1,
          data: {
            menus: Risk
          }
        }
      ])
    })
  })

  // 获取(贷后管理)菜单
  axios.onGet('/after-loan').reply(config => {
    return new Promise((resolve, reject) => {
      resolve([
        200, {
          code: 1,
          data: {
            menus: AfterLoan
          }
        }
      ])
    })
  })

  // 获取(报表管理)菜单
  axios.onGet('/report').reply(config => {
    return new Promise((resolve, reject) => {
      resolve([
        200, {
          code: 1,
          data: {
            menus: Report
          }
        }
      ])
    })
  })

  // 获取(产品管理)菜单
  axios.onGet('/product').reply(config => {
    return new Promise((resolve, reject) => {
      resolve([
        200, {
          code: 1,
          data: {
            menus: Product
          }
        }
      ])
    })
  })

  // 获取(系统管理)菜单
  axios.onGet('/system').reply(config => {
    return new Promise((resolve, reject) => {
      resolve([
        200, {
          code: 1,
          data: {
            menus: System
          }
        }
      ])
    })
  })
}

export default menus
