const LoanSuspend = [
  {
    label: '序号',
    value: 'id',
    width: '80'
  },
  {
    label: '任务名称',
    value: 'rname',
    width: ''
  },
  {
    label: '客户名称',
    value: 'cname',
    width: ''
  },
  {
    label: '产品名称',
    value: 'pname',
    width: ''
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
    label: '放款金额(元)',
    value: 'loanmoney',
    width: '120',
    sortable: true
  },
  {
    label: '放款期限',
    value: 'loantime',
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
    label: '状态',
    value: 'status',
    width: '100',
    formatter: row => row.status === 1 ? '确认放款' : '已暂停'
  }
]

export default { LoanSuspend }
