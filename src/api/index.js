// 系统配置参数
const domain = process.env.NODE_ENV === 'production' ? 'i.weknet.cn' : process.env.NODE_ENV === 'release' ? 'r.t.weknet.cn' : 'r.d.weknet.cn'
export const config = {
  url: `http://${domain}/backend/`, // 接口地址
  limit: 10 // 每页显示条目个数
}
// 系统基础接口映射
export const system = {
  login: 'admin-login', // 登录
  // logout: 'logout', // 退出
  // modifyPwd: 'modifyPwd', // 修改密码
  navMenu: 'menus' // 菜单列表
}
// 系统设置
export const setting = {
  // 用户管理
  users: 'admin-list', // 用户列表
  userAdd: 'admin-add', // 添加用户
  userDel: 'admin-delete', // 删除用户
  userBatchRemove: 'admin-delete', // 批量删除用户
  userEdit: 'admin-edit', // 编辑用户
  userInfo: 'admin-detail', // 用户详情
  roleDeptList: 'role-dept-list', // 角色部门列表
  // 角色管理
  roleList: 'role-list', // 角色列表
  roleAdd: 'role-add', // 添加角色
  roleDelete: 'role-delete', // 删除角色
  roleEdit: 'role-edit', // 编辑角色
  roleDetail: 'role-detail', // 角色详情
  permissionRoleAdd: 'permission-role-add', // 编辑权限
  permissionRoleDetail: 'permission-role-detail', // 权限详细
  // 权限管理
  pList: 'permission-list', // 权限列表
  pType: 'permission-type', // 权限类型
  pAdd: 'permission-add', // 权限添加
  pEdit: 'permission-edit', // 权限编辑
  pDetail: 'permission-detail', // 权限详情
  // 部门管理
  DList: 'department-list', // 部门列表
  DListAll: 'department-list-all', // 部门子集列表
  DAdd: 'department-add', // 部门添加
  DDelete: 'department-delete', // 部门删除
  DEdit: 'department-edit', // 部门修改
  DDetail: 'department-detail' // 部门详细
}
// 贷款管理
export const loan = {
  // 业务管理
  business: 'business',
  // 合同管理列表
  contract: 'contract-list',
  // 合同管理详细
  contractDetail: 'contract-detail',
  // 业务查询
  businessQuery: 'businessQuery',
  // 征信查询
  credit: 'credit',
  // 放款申请
  loanApply: 'loanApply',
  // 放款确认
  loanConfirm: 'loanConfirm',
  // 放款完成
  loanFinish: 'loanFinish'
}
// 产品管理
export const product = {
  // 产品类型
  pTypeList: 'products',
  pTypeSRemove: 'Tspremove',
  pTypeRemove: 'Tplremove',
  // 产品列表
  pList: 'plist',
  pListSremove: 'spremove',
  pListPremove: 'plremove'
}
// 风控管理
export const risk = {
  // 初审分配
  assignList: 'assign-list',
  assignRemove: 'assign-remove',
  // 业务初审
  firstList: 'first-list',
  firstRemove: 'first-remove',
  // 业务复审
  reverfiyList: 'verify-list',
  reverfiyRemove: 'verify-remove',
  // 放款暂停
  lsuspendList: 'lsuspend-list',
  lsuspendRemove: 'lsuspend-remove',
  // 放款恢复
  lrecoveryList: 'lrecovery-list',
  lrecoveryRemove: 'lrecovery-remove'
}
// 客户管理
export const customer = {
  management: 'user-list', // 用户列表
  details: 'user-detail' // 详情页
}
// 逾期用户
export const report = {
  overdueUser: 'overdueUser' // 逾期用户
}
// 操作日志
export const systemO = {
  operationlog: 'adminlog-list'
}
// 数据管理
export const dataManage = {
  // 常量类型
  consTypeList: 'constype-list', // 常量分类列表
  consTypeAdd: 'constype-add', // 常量分类添加
  consTypeSpinner: 'constype-spinner', // 常量分类获取全部
  // 常量设置
  consList: 'cons-list', // 常量列表
  consAdd: 'cons-add', // 常量添加
  consDetail: 'cons-detail', // 常量详情
  consDel: 'cons-delete', // 常量删除
  consDelAll: 'cons-delete', // 常量删除
  consEdit: 'cons-edit' // 常量编辑
}
// 贷后管理
export const afterLoan = {
  // 催收列表
  getUrgeList: 'hurry-list', // 催收列表
  getUrgeDetail: 'hurry-detail', // 催收详情
  addUrge: 'hurry-add', // 添加催收
  editUrge: 'hurry-edit', // 编辑催收
  deleteUrge: 'hurry-delete', // 删除催收
  // 提醒记录
  getRemindContracts: 'remindlog-all-contract', // 提醒首页
  getRemindDetail: 'remindlog-record', // 提醒记录
  addRemind: 'remindlog-add', // 添加提醒
  editRemind: 'remindlog-edit', // 修改提醒
  deleteRemind: 'remindlog-delete', // 删除提醒
  // 坏账列表
  getBadDebtList: 'bad-debt-list', // 坏账首页
  getBadDebtDetail: 'bad-debt-detail', // 坏账详情
  // 用户黑名单
  userList: 'user-list',
  userBlackList: 'user-black-list', // 黑名单列表
  userBlackAdd: 'user-black-add', // 添加
  userBlackEdit: 'user-black-edit', // 编辑
  userBlackDelete: 'user-black-delete' // 删除
}
