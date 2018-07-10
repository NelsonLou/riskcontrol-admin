// 获取导航菜单
const Menus = [
  {
    display_name: '贷款管理',
    path: 'loan',
    children: [
      {
        name: '业务受理',
        path: 'business-mgr',
        children: [
          {
            name: '客户管理',
            path: '/loan/business-mgr/customer'
          }, {
            name: '业务管理',
            path: '/loan/business-mgr/business'
          }, {
            name: '合同管理',
            path: '/loan/business-mgr/contract'
          }, {
            name: '征信查询',
            path: '/loan/business-mgr/credit'
          }, {
            name: '业务查询',
            path: '/loan/business-mgr/business-query'
          }
        ]
      }, {
        name: '放款处理',
        path: 'loan-mgr',
        children: [
          {
            name: '放款申请',
            path: '/loan/loan-mgr/loan-apply'
          }, {
            name: '放款确认',
            path: '/loan/loan-mgr/loan-confirm'
          }, {
            name: '放款完成',
            path: '/loan/loan-mgr/loan-finish'
          }
        ]
      }
    ]
  }, {
    display_name: '风控管理',
    path: 'risk',
    children: [
      {
        name: '风控审核',
        path: 'risk-mgr',
        children: [
          {
            name: '初审分配',
            path: '/risk/risk-mgr/verify-assign'
          }, {
            name: '业务初审',
            path: '/risk/risk-mgr/first-verify'
          }, {
            name: '业务复审',
            path: '/risk/risk-mgr/reverify'
          }
        ]
      }, {
        name: '放款处理',
        path: 'risk-loan',
        children: [
          {
            name: '暂停放款',
            path: '/risk/risk-loan/loan-suspend'
          }, {
            name: '恢复放款',
            path: '/risk/risk-loan/loan-recovery'
          }
        ]
      }
    ]
  }, {
    display_name: '贷后管理',
    path: 'after-loan',
    children: [
      {
        name: '催收管理',
        path: 'urge-mgr',
        children: [
          {
            name: '催收分配',
            path: '/after-loan/urge-mgr/urge-assign'
          }, {
            name: '催收列表',
            path: '/after-loan/urge-mgr/urge-list'
          }, {
            name: '提醒记录',
            path: '/after-loan/urge-mgr/remind-list'
          }
        ]
      }, {
        name: '还款情况',
        path: 'repay-info',
        children: [
          {
            name: '还款情况查询',
            path: '/after-loan/repay-info/repay-query'
          }, {
            name: '应还信息查询',
            path: '/after-loan/repay-info/should-repay-query'
          }
        ]
      }, {
        name: '坏账管理',
        path: 'bad-debt',
        children: [
          {
            name: '坏账列表',
            path: '/after-loan/bad-debt/bad-debt-list'
          }
        ]
      }, {
        name: '黑名单管理',
        path: 'blacklist-mgr',
        children: [
          {
            name: '黑名单列表',
            path: '/after-loan/blacklist-mgr/blacklist'
          }, {
            name: '申请解除黑名单',
            path: '/after-loan/blacklist-mgr/blacklist-release'
          }
        ]
      }
    ]
  }, {
    display_name: '产品管理',
    path: 'product',
    children: [
      {
        name: '产品管理',
        path: 'product-mgr',
        children: [
          {
            name: '产品类型',
            path: '/product/product-mgr/product-type'
          }, {
            name: '产品列表',
            path: '/product/product-mgr/product-list'
          }
        ]
      }
    ]
  }, {
    display_name: '报表管理',
    path: 'report',
    children: [
      {
        name: '贷后报表',
        path: 'after-loan-report',
        children: [
          {
            name: '逾期客户',
            path: '/report/after-loan-report/delay-customer'
          }
        ]
      }
    ]
  }, {
    display_name: '系统管理',
    path: 'system',
    children: [
      {
        name: '系统设置',
        path: 'system-mgr',
        children: [
          {
            name: '部门管理',
            path: '/system/system-mgr/department'
          }, {
            name: '用户管理',
            path: '/system/system-mgr/users'
          }, {
            name: '角色管理',
            path: '/system/system-mgr/role'
          }, {
            name: '权限管理',
            path: '/system/system-mgr/permission'
          }
        ]
      }, {
        //   name: '消息模板管理',
        //   path: 'msg-template-mgr',
        //   children: [
        //     {
        //       name: '消息模板列表',
        //       path: '/system/msg-template-mgr/msg-template-list'
        //     }
        //   ]
        // }, {
        name: '数据管理',
        path: 'data-mgr',
        children: [
          {
            name: '常量类型',
            path: '/system/data-mgr/constant-type'
          }, {
            name: '常量设置',
            path: '/system/data-mgr/constant-list'
          }
        ]
      }, {
        name: '日志管理',
        path: 'log-mgr',
        children: [
          {
            //   name: '登录日志',
            //   path: '/system/log-mgr/login-log'
            // }, {
            name: '操作日志',
            path: '/system/log-mgr/operation-log'
          }
        ]
      }
    ]
  }
]

export {
  Menus
}
