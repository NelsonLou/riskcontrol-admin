const data = {
  // 表格列数据
  columns: [
    {
      value: 'admin_name',
      label: '帐号',
      width: 120
    }, {
      value: 'admin_nick',
      label: '昵称',
      width: 120
    }, {
      value: 'admin_sex',
      label: '性别',
      width: 120,
      sortable: true,
      formatter: row => row.admin_sex === 1
        ? '男'
        : row.admin_sex === 0
          ? '女'
          : '未知'
    }, {
      value: 'admin_birthday',
      label: '生日',
      minw: 110,
      sortable: true
    }
  ],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '请输入账号或昵称'
    }
  ],
  // 编辑表单元素
  editItem: [
    {
      eleType: 'checkbox',
      label: '角色',
      value: 'has_role_list'
    }, {
      eleType: 'select',
      label: '部门',
      value: 'dept_id',
      plh: '请选择部门',
      filter: true
    }, {
      eleType: 'input',
      label: '帐号',
      value: 'admin_name',
      plh: '请输入账号'
    }, {
      eleType: 'input',
      iptType: 'password',
      label: '密码',
      value: 'admin_password',
      plh: '请输入密码'
    }, {
      eleType: 'input',
      label: '昵称',
      value: 'admin_nick',
      plh: '请输入昵称'
    }, {
      eleType: 'radio',
      label: '性别',
      value: 'admin_sex',
      options: [
        {
          value: '1',
          label: '男'
        }, {
          value: '0',
          label: '女'
        }
      ]
    }, {
      eleType: 'date',
      label: '生日',
      value: 'admin_birthday',
      plh: '选择日期'
    }
  ],
  // 编辑表单验证
  editRule: {
    has_role_list: [
      {
        type: 'array',
        required: true,
        message: '请至少选择一个角色',
        trigger: 'change'
      }
    ],
    dept_id: [
      {
        type: 'number',
        required: true,
        message: '请选择部门',
        trigger: 'change'
      }
    ],
    admin_name: [
      {
        required: true,
        message: '请输入账号',
        trigger: 'blur'
      }, {
        min: 5,
        max: 20,
        message: '长度在 5 到 20 个字符',
        trigger: 'blur'
      }
    ],
    admin_password: [
      {
        min: 5,
        max: 20,
        message: '长度在 5 到 20 个字符',
        trigger: 'blur'
      }
    ],
    admin_nick: [
      {
        required: true,
        message: '请输入昵称',
        trigger: 'blur'
      }, {
        min: 2,
        max: 12,
        message: '长度在 2 到 12 个字符',
        trigger: 'blur'
      }
    ],
    admin_sex: [
      {
        required: true,
        message: '请选择性别',
        trigger: 'change'
      }
    ]
  }
}

export default data
