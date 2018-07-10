const data = {
  // 表格列数据
  columns: [{
    value: 'name',
    label: '标识',
    width: 200
  }, {
    value: 'display_name',
    label: '角色名',
    width: 200
  }, {
    value: 'description',
    label: '说明',
    minw: 300
  }, {
    value: 'created_at',
    label: '创建时间',
    width: 200
  }],
  // 编辑表单元素
  editItem: [
    {
      eleType: 'input',
      label: '标识（英文）',
      value: 'name',
      plh: '请输入标识（英文）'
    }, {
      eleType: 'input',
      label: '角色名称',
      value: 'display_name',
      plh: '请输入角色名称'
    }, {
      eleType: 'input',
      label: '说明',
      value: 'description',
      plh: '请输入说明'
    }
  ],
  // 编辑表单验证
  editRule: {
    name: [{
      required: true,
      message: '请输入标识（英文）',
      trigger: 'blur'
    }],
    display_name: [{
      required: true,
      message: '请输入角色名',
      trigger: 'blur'
    }]
  }
}

export default data
