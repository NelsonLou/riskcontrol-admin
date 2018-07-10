const VerifyAssign = [
  {
    label: '序号',
    value: 'id',
    width: '80'
  },
  {
    label: '任务名称',
    value: 'rname',
    width: '130'
  },
  {
    label: '客户名称',
    value: 'cname',
    width: '150'
  },
  {
    label: '产品名称',
    value: 'pname',
    width: '150'
  },
  {
    label: '放款主体',
    value: 'protype',
    width: '110'
  },
  {
    label: '申请金额(元)',
    value: 'applymoney',
    width: '150'
  },
  {
    label: '申请期限',
    value: 'deadline',
    width: '120',
    sortable: true
  },
  {
    label: '分部',
    value: 'branch',
    width: '110'
  },
  {
    label: '申请日期',
    value: 'applytime',
    width: '120',
    sortable: true
  },
  {
    label: '提交日期',
    value: 'submittime',
    width: '120',
    sortable: true
   },
  {
    label: '状态',
    value: 'status',
    width: '80',
    formatter: row => row.status === 1 ? '处理中' : row.status === 0 ? '待处理' : '已处理'
  },
  {
    label: '经办人',
    value: 'macker',
    width: '110'
  }
]

export default { VerifyAssign }
