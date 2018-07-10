// Vue Router 路由配置
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Dashboard from '@/pages/Dashboard'
// 贷款管理
import Customer from '@/pages/loan/Customer'
import Business from '@/pages/loan/Business'
import Contract from '@/pages/loan/Contract'
import Credit from '@/pages/loan/Credit'
import BusinessQuery from '@/pages/loan/BusinessQuery'
import LoanApply from '@/pages/loan/LoanApply'
import LoanConfirm from '@/pages/loan/LoanConfirm'
import LoanFinish from '@/pages/loan/LoanFinish'
// 风控管理
import VerifyAssign from '@/pages/risk/VerifyAssign'
import FirstVerify from '@/pages/risk/FirstVerify'
import Reverify from '@/pages/risk/Reverify'
import LoanSuspend from '@/pages/risk/LoanSuspend'
import LoanRecovery from '@/pages/risk/LoanRecovery'
// 贷后管理
import UrgeAssign from '@/pages/afterLoan/UrgeAssign'
import UrgeList from '@/pages/afterLoan/UrgeList'
import RemindList from '@/pages/afterLoan/RemindList'
import RepayQuery from '@/pages/afterLoan/RepayQuery'
import ShouldRepayQuery from '@/pages/afterLoan/ShouldRepayQuery'
import BadDebtList from '@/pages/afterLoan/BadDebtList'
import Blacklist from '@/pages/afterLoan/Blacklist'
import BlacklistRelease from '@/pages/afterLoan/BlacklistRelease'
// 产品管理
import ProductType from '@/pages/product/ProductType'
import ProductList from '@/pages/product/ProductList'
// 报表管理
import DelayCustomer from '@/pages/report/DelayCustomer'
// 系统管理
import Department from '@/pages/system/Department'
import Users from '@/pages/system/Users'
import Role from '@/pages/system/Role'
import Permission from '@/pages/system/Permission'
import MsgTemplateList from '@/pages/system/MsgTemplateList'
import ConstantType from '@/pages/system/ConstantType'
import ConstantList from '@/pages/system/ConstantList'
import LoginLog from '@/pages/system/LoginLog'
import OperationLog from '@/pages/system/OperationLog'

const routes = [
  {
    name: '404',
    path: '*',
    component: NotFound
  }, {
    name: '登录',
    path: '/login',
    component: Login
  }, {
    name: '首页',
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        name: '仪表盘',
        path: '/dashboard',
        component: Dashboard
      }
    ]
  }, {
    name: '贷款管理',
    path: '/loan',
    redirect: '/loan/business-mgr/customer',
    component: Layout,
    children: [
      {
        name: '客户管理',
        path: '/loan/business-mgr/customer',
        component: Customer
      }, {
        name: '业务管理',
        path: '/loan/business-mgr/business',
        component: Business
      }, {
        name: '合同管理',
        path: '/loan/business-mgr/contract',
        component: Contract
      }, {
        name: '征信查询',
        path: '/loan/business-mgr/credit',
        component: Credit
      }, {
        name: '业务查询',
        path: '/loan/business-mgr/business-query',
        component: BusinessQuery
      }, {
        name: '放款申请',
        path: '/loan/loan-mgr/loan-apply',
        component: LoanApply
      }, {
        name: '放款确认',
        path: '/loan/loan-mgr/loan-confirm',
        component: LoanConfirm
      }, {
        name: '放款完成',
        path: '/loan/loan-mgr/loan-finish',
        component: LoanFinish
      }
    ]
  }, {
    name: '风控管理',
    path: '/risk',
    redirect: '/risk/risk-mgr/verify-assign',
    component: Layout,
    children: [
      {
        name: '初审分配',
        path: '/risk/risk-mgr/verify-assign',
        component: VerifyAssign
      }, {
        name: '业务初审',
        path: '/risk/risk-mgr/first-verify',
        component: FirstVerify
      }, {
        name: '业务复审',
        path: '/risk/risk-mgr/reverify',
        component: Reverify
      }, {
        name: '暂停放款',
        path: '/risk/risk-loan/loan-suspend',
        component: LoanSuspend
      }, {
        name: '恢复放款',
        path: '/risk/risk-loan/loan-recovery',
        component: LoanRecovery
      }
    ]
  }, {
    name: '贷后管理',
    path: '/after-loan',
    redirect: '/after-loan/urge-mgr/urge-assign',
    component: Layout,
    children: [
      {
        name: '催收分配',
        path: '/after-loan/urge-mgr/urge-assign',
        component: UrgeAssign
      }, {
        name: '催收列表',
        path: '/after-loan/urge-mgr/urge-list',
        component: UrgeList
      }, {
        name: '提醒记录',
        path: '/after-loan/urge-mgr/remind-list',
        component: RemindList
      }, {
        name: '还款情况查询',
        path: '/after-loan/repay-info/repay-query',
        component: RepayQuery
      }, {
        name: '应还信息查询',
        path: '/after-loan/repay-info/should-repay-query',
        component: ShouldRepayQuery
      }, {
        name: '坏账列表',
        path: '/after-loan/bad-debt/bad-debt-list',
        component: BadDebtList
      }, {
        name: '黑名单列表',
        path: '/after-loan/blacklist-mgr/blacklist',
        component: Blacklist
      }, {
        name: '申请解除黑名单',
        path: '/after-loan/blacklist-mgr/blacklist-release',
        component: BlacklistRelease
      }
    ]
  }, {
    name: '产品管理',
    path: '/product',
    redirect: '/product/product-mgr/product-type',
    component: Layout,
    children: [
      {
        name: '产品类型',
        path: '/product/product-mgr/product-type',
        component: ProductType
      }, {
        name: '产品列表',
        path: '/product/product-mgr/product-list',
        component: ProductList
      }
    ]
  }, {
    name: '表报管理',
    path: '/report',
    redirect: '/report/after-loan-report/delay-customer',
    component: Layout,
    children: [
      {
        name: '逾期客户',
        path: '/report/after-loan-report/delay-customer',
        component: DelayCustomer
      }
    ]
  }, {
    name: '系统管理',
    path: '/system',
    redirect: '/system/system-mgr/users',
    component: Layout,
    children: [
      {
        name: '部门管理',
        path: '/system/system-mgr/department',
        component: Department
      }, {
        name: '用户管理',
        path: '/system/system-mgr/users',
        component: Users
      }, {
        name: '角色管理',
        path: '/system/system-mgr/role',
        component: Role
      }, {
        name: '权限管理',
        path: '/system/system-mgr/permission',
        component: Permission
      }, {
        name: '消息模板列表',
        path: '/system/msg-template-mgr/msg-template-list',
        component: MsgTemplateList
      }, {
        name: '常量类型',
        path: '/system/data-mgr/constant-type',
        component: ConstantType
      }, {
        name: '常量设置',
        path: '/system/data-mgr/constant-list',
        component: ConstantList
      }, {
        name: '登录日志',
        path: '/system/log-mgr/login-log',
        component: LoginLog
      }, {
        name: '操作日志',
        path: '/system/log-mgr/operation-log',
        component: OperationLog
      }
    ]
  }
]

export default routes
