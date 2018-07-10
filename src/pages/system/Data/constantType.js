const data = {
  // 表格列数据
  columns: [{
      value: 'type_id',
      label: 'ID',
      width: 80
    },
    {
      value: 'type',
      label: '类型',
      width: 180
    },
    {
      value: 'name',
      label: '名称',
      'min-width': 100
    }
  ],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '请输入要搜索的类型'
    }
  ],
  // 编辑表单元素
  editItem: [
    {
      eleType: 'input',
      label: '类型',
      value: 'type',
      plh: '请输入类型'
    }, {
      eleType: 'input',
      label: '名称',
      value: 'name',
      plh: '请输入名称'
    }
  ],
  // 编辑表单验证
  editRule: {
    name: [
      {
        required: true,
        message: '请输入名称',
        trigger: 'blur'
      }
    ],
    type: [
      {
        required: true,
        message: '请输入类型',
        trigger: 'blur'
      }
    ]
  }
}

export default data
