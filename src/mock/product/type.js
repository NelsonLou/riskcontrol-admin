const products = (mock, axios, qs) => {
  // Mock 模拟用户数据
  let data = mock.mock({
      'products|87': [
        {
          'id': '@increment',
          'company': '维凯网科技有限公司',
          'protype': '@word',
          'sort': '2131',
          'lateFree|0-2': 1,
          'damages|18-60': 1,
          'createtime': '@date',
          'creater': 'xinqian',
          'updatetime': '@date',
          'checkList': ['提高生活质量'],
          'content': [
            {
              'label': '资料保管费',
              'prop': 'custodian',
              'radio': {
                'status': 0,
                'label': '启用',
                'check': '',
                'model': 'iscustodian'
              },
              'input': {
                'model': '22.00',
                'palceholder': ''
              },
              'options': [
                {
                  'model': '456456',
                  'palceholder': '-请选择-',
                  'sort': [
                    {
                      'label': '456456',
                      'value': 'shanghai'
                    },
                    {
                      'label': 'shanghai',
                      'value': 'tianjing'
                    }
                 ]
                },
                {
                  'model': 'shanghai',
                  'palceholder': '-请选择-',
                  'sort': [
                    {
                      'label': 'shanghai',
                      'value': 'nanjing'
                    },
                    {
                      'label': 'shanghai',
                      'value': 'tianjing'
                    }
                 ]
                }
              ]
            },
            {
              'label': '居间费',
              'prop': 'custodian',
              'radio': {
                'status': 0,
                'label': '启用',
                'check': '',
                'model': 'iscustodian'
              },
              'input': {
                'model': '400.00',
                'palceholder': ''
              },
              'options': [
                {
                  'model': '234',
                  'palceholder': '-请选择-',
                  'sort': [
                    {
                      'label': '234',
                      'value': 'shanghai'
                    },
                    {
                      'label': 'shanghai',
                      'value': 'xinqiani'
                    }
                 ]
                },
                {
                  'model': 'xinqian',
                  'palceholder': '-请选择-',
                  'sort': [
                    {
                      'label': 'xinqian',
                      'value': 'shanghai'
                    },
                    {
                      'label': 'chenkai',
                      'value': 'shanghai'
                    }
                 ]
                }
              ]
            },
            {
              'label': '平台管理费',
              'prop': 'custodian',
              'radio': {
                'status': 0,
                'label': '启用',
                'check': '',
                'model': 'iscustodian'
              },
              'input': {
                'model': '1000.00',
                'palceholder': ''
              },
              'options': [
                {
                  'model': 'shanghai',
                  'palceholder': '-请选择-',
                  'sort': [
                    {
                      'label': 'shanghai',
                      'value': 'shanghai'
                    },
                    {
                      'label': 'shanghai',
                      'value': 'shanghai'
                    }
                 ]
                },
                {
                  'model': 'qwe',
                  'palceholder': '-请选择-',
                  'sort': [
                    {
                      'label': 'shanghai',
                      'value': 'qwe'
                    },
                    {
                      'label': 'shanghai',
                      'value': 'qqq'
                    }
                 ]
                }
              ]
            }
          ]
        }
      ]
  })
  let Products = data.products

  axios.onGet('/products').reply(config => {
    let {page, limit, protype} = config.params
    let mockProducts = Products.filter(products => {
      if (protype && products.protype.indexOf(protype) === -1) {
        return false
      }
      return true
    })
    let total = mockProducts.length
    mockProducts = mockProducts.filter((u, index) => index < limit * page && index >= limit * (page - 1))
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            data: {
              total: total,
              products: mockProducts
            }
          }
        ])
      }, 1000)
    })
   })

  // 删除单个产品类型
  axios.onPost('/Tspremove').reply(config => {
    let {id} = qs.parse(config.data).params
    Products = Products.filter(u => u.id.toString() !== id)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            message: '删除成功'
          }
        ])
      }, 500)
    })
  })

  // 批量删除产品类型
  axios.onPost('/Tplremove').reply(config => {
    let {id} = qs.parse(config.data).params
    id = id.split(',')
    Products = Products.filter(u => !id.includes(u.id.toString()))
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            message: '删除成功'
          }
        ])
      }, 500)
    })
  })

  // 编辑产品类型
  axios.onPost('/pedit').reply(config => {
    let {id, company, protype, lateFree, damages, createtime, creater, updatetime, content, sort, checkList} = qs.parse(config.data)
    Products.some(p => {
      if (p.id.toString() === id) {
        p.company = company
        p.protype = protype
        p.lateFree = parseInt(lateFree)
        p.damages = parseInt(damages)
        p.createtime = createtime
        p.creater = creater
        p.updatetime = updatetime
        p.content = content
        p.sort = sort
        p.checkList = checkList
        return true
      }
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            message: '编辑成功'
          }
        ])
      }, 500)
    })
  })

  // 新增产品类型
  axios.onPost('/padd').reply(config => {
    let {company, protype, lateFree, damages, createtime, creater, updatetime, content, sort, checkList} = qs.parse(config.data)
    Products.unshift({ company: company, protype: protype, sort: sort, checkList: checkList, lateFree: lateFree, damages: damages, createtime: createtime, creater: creater, updatetime: updatetime, content: content })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          200, {
            code: 1,
            message: '新增成功'
          }
        ])
      }, 500)
    })
  })
}
export default products
