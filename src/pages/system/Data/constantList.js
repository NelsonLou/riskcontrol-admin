const data = {
  // 表格列数据
  columns: [{
      value: 'constant_id',
      label: 'ID',
      width: 80
    }, {
      value: 'constant_key_name',
      label: '规则',
      'min-width': 350
    }, {
      value: 'constant_key',
      label: '键名',
      width: 180
    },
    {
      value: 'type',
      label: '类型',
      width: 100
    }, {
      value: 'constant_val',
      label: '数值',
      width: 90
    }
  ],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '请输入要搜索的规则'
    }
  ],
  // 编辑表单元素
  editItem: [
    {
      eleType: 'input',
      label: '规则',
      value: 'constant_key_name',
      plh: '请输入规则'
    }, {
      eleType: 'input',
      label: '键名',
      value: 'constant_key',
      plh: '请输入键名'
    }, {
      eleType: 'input',
      label: '类型',
      value: 'type',
      plh: '请输入关类型'
    }, {
      eleType: 'input',
      label: '数值',
      value: 'constant_val',
      plh: '请输入数值'
    }
  ],
  // 编辑表单验证
  editRule: {
    type: [{
      required: true,
      message: '请输入类型',
      trigger: 'blur'
    }],
    constant_key: [{
      required: true,
      message: '请输入键名',
      trigger: 'blur'
    }],
    constant_key_name: [{
      required: true,
      message: '请输入规则',
      trigger: 'blur'
    }],
    constant_val: [{
      required: true,
      message: '请输入数值',
      trigger: 'blur'
    }]
  }
}

export default data
