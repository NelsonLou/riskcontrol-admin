const data = {
  // 表格列数据
  columns: [
    {
      value: 'real_name',
      label: '用户名',
      width: 120
    }, {
      value: 'user_idcard',
      label: '身份证号',
      minw: 200
    }, {
      value: 'created_at',
      label: '拉黑时间',
      minw: 180
    }, {
      value: 'black_desc',
      label: '拉黑说明',
      minw: 300
    }, {
      value: 'admin_name',
      label: '操作员',
      width: 120
    }
  ],
  // 编辑表单元素
  editItem: [
    {
      disabled: true,
      eleType: 'select',
      label: '用户ID',
      value: 'user_id',
      plh: '请输入用户ID'
    }, {
      eleType: 'input',
      label: '拉黑说明',
      value: 'black_desc',
      plh: '请输入拉黑说明',
      iptType: 'textarea'
    }
  ],
  // 编辑表单验证
  editRule: {
    user_id: [
      {
        type: 'integer',
        required: true,
        message: '请选择用户ID',
        trigger: 'change'
      }
    ],
    black_desc: [
      {
        required: true,
        message: '请输入拉黑说明',
        trigger: 'blur'
      }
    ]
  }
}

export default data
