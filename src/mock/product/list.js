const productslist = (mock, axios, qs) => {
  // 模拟产品列表数据
  let data = mock.mock({
    'productslist|66': [
      {
        'id': '@increment',
        'company': '@name',
        'name': '@word',
        'protype': '经营贷',
        'lateFree|0-2': 1,
        'damages|18-60': 1,
        'deadline': '@date',
        'createtime': '@date',
        'creater': 'xinqian',
        'updatetime': '@date',
        'status|0-1': 1,
        'content': {
          'items': [
              {
                'label': '设置公司',
                'prop': 'company',
                'select': {
                  'model': '123',
                  'placeholder': '请选择公司类型',
                  'disabled': false,
                  'options': [
                    {
                      'label': 'shanghai',
                      'value': 'shanghai'
                    },
                    {
                      'label': 'shanghai',
                      'value': 'shanghai'
                    }
                  ]
                }
              },
              {
                'label': '产品名称',
                'prop': 'company',
                'select': {
                  'model': '',
                  'placeholder': '@word',
                  'disabled': true,
                  'options': [
                    {
                      'label': 'xinqian',
                      'value': 'shanghai'
                    },
                    {
                      'label': 'moxing',
                      'value': 'shanghai'
                    }
                  ]
                }
              },
              {
                'label': '产品类型',
                'prop': 'company',
                'select': {
                  'model': 'xinqian',
                  'placeholder': '请选择产品类型',
                  'disabled': true,
                  'options': [
                    {
                      'label': 'shanghai',
                      'value': 'shanghai'
                    },
                    {
                      'label': 'shanghai',
                      'value': 'shanghai'
                    }
                  ]
                }
              }
             ],
          'settings': [
              {
                'label': '放款金额',
                'prop': '',
                'labelcontent': '(复制标签到计算公式)',
                'input': [
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': false
                  },
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': false
                  }
                ]
              },
              {
                'label': '贷款期数',
                'prop': 'monthnum',
                'labelcontent': '(复制标签到计算公式)',
                'input': [
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': true
                  },
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': false
                  }
                ]
              },
              {
                'label': '居间费',
                'prop': 'custodian',
                'labelcontent': '(复制标签到计算公式)',
                'input': [
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': true
                  },
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': false
                  }
                ]
              },
              {
                'label': '平台管理费',
                'prop': 'platformfee',
                'labelcontent': '(复制标签到计算公式)',
                'input': [
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': true
                  },
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': false
                  }
                ]
              },
              {
                'label': '放款金额',
                'prop': '',
                'labelcontent': '(复制标签到计算公式)',
                'input': [
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': true
                  },
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': false
                  }
                ]
              },
              {
                'label': '审核费',
                'prop': 'verifyfee',
                'labelcontent': '(复制标签到计算公式)',
                'input': [
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': true
                  },
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': false
                  }
                ]
              },
              {
                'label': '咨询服务费',
                'prop': 'consultfee',
                'labelcontent': '(复制标签到计算公式)',
                'input': [
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': true
                  },
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': false
                  }
                ]
              },
              {
                'label': '意外保险',
                'prop': 'emergencyfee',
                'labelcontent': '(复制标签到计算公式)',
                'input': [
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': true
                  },
                  {
                    'placeholder': '',
                    'model': '',
                    'disabled': false
                  }
                ]
              }
            ],
          'monthCal': 'monthCal'
        },
        'content2': [
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

  let Productslist = data.productslist // 将产品列表赋值给新变量
  // GET产品列表数据处理
  axios.onGet('/plist').reply(config => {
    let {limit, name, page} = config.params
    let mockProductlist = Productslist.filter(productslist => {
      if (name && productslist.name.indexOf(name) === -1) {
        return false
      }
      return productslist
    })

    let total = mockProductlist.length
    mockProductlist = mockProductlist.filter((u, index) => {
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
              data: mockProductlist,
              total: total
            }
          }
        ])
    }, 500)
    })
  })

  // 批量删除产品类型
  axios.onPost('/plremove').reply(config => {
    let {id} = qs.parse(config.data).params
    id = id.split(',')
    Productslist = Productslist.filter(u => !id.includes(u.id.toString()))
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

  // 单个删除产品类型
  axios.onPost('/spremove').reply(config => {
    let {id} = qs.parse(config.data).params
    Productslist = Productslist.filter(u => u.id.toString() !== id)
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
}

export default productslist
