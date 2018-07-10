const columns = [
  {
    label: '序号',
    value: 'id',
    width: '80'
  },
  {
    label: '所属公司',
    value: 'company',
    width: '180'
  },
  {
    label: '产品名称',
    value: 'name',
    width: '180'
  },
  {
    label: '产品类型',
    value: 'protype',
    width: '120'
  },
  {
    label: '滞纳金',
    value: 'lateFree',
    width: '80'
  },
  {
    label: '违约金',
    value: 'damages',
    width: '80'
  },
  {
    label: '期限',
    value: 'deadline',
    width: '120',
    sortable: true
  },
  {
    label: '创建时间',
    value: 'createtime',
    width: '130',
    sortable: true
  },
  {
    label: '创建人',
    value: 'creater',
    width: '120'
  },
  {
    label: '修改时间',
    value: 'updatetime',
    width: '130',
    sortable: true
  },
  {
    label: '状态',
    value: 'status',
    width: '',
    formatSatus: row => row.status === 1 ? '启用' : '禁用'
  }
]

const JXform = {
  items: [
    {
      label: '设置公司',
      prop: 'company',
      select: {
        model: '',
        placeholder: '请选择公司类型',
        disabled: false,
        options: [
          {
            label: 'shanghai',
            value: 'shanghai'
          },
          {
            label: 'shanghai',
            value: 'shanghai'
          }
        ]
      }
    },
    {
      label: '产品名称',
      prop: 'company',
      select: {
        model: '',
        placeholder: '产品名称',
        disabled: true,
        options: [
          {
            label: 'xinqian',
            value: 'shanghai'
          },
          {
            label: 'moxing',
            value: 'shanghai'
          }
        ]
      }
    },
    {
      label: '产品类型',
      prop: 'company',
      select: {
        model: '',
        placeholder: '请选择产品类型',
        disabled: true,
        options: [
          {
            label: 'shanghai',
            value: 'shanghai'
          },
          {
            label: 'shanghai',
            value: 'shanghai'
          }
        ]
      }
    }
  ],
  settings: [
    {
      label: '放款金额',
      prop: '',
      labelcontent: '(复制标签到计算公式)',
      input: [
        {
          placeholder: '',
          model: '',
          disabled: false
        },
        {
          placeholder: '',
          model: '',
          disabled: false
        }
      ]
    },
    {
      label: '贷款期数',
      prop: 'monthnum',
      labelcontent: '(复制标签到计算公式)',
      input: [
        {
          placeholder: '',
          model: '',
          disabled: true
        },
        {
          placeholder: '',
          model: '',
          disabled: false
        }
      ]
    },
    {
      label: '居间费',
      prop: 'custodian',
      labelcontent: '(复制标签到计算公式)',
      input: [
        {
          placeholder: '',
          model: '',
          disabled: true
        },
        {
          placeholder: '',
          model: '',
          disabled: false
        }
      ]
    },
    {
      label: '平台管理费',
      prop: 'platformfee',
      labelcontent: '(复制标签到计算公式)',
      input: [
        {
          placeholder: '',
          model: '',
          disabled: true
        },
        {
          placeholder: '',
          model: '',
          disabled: false
        }
      ]
    },
    {
      label: '放款金额',
      prop: '',
      labelcontent: '(复制标签到计算公式)',
      input: [
        {
          placeholder: '',
          model: '',
          disabled: true
        },
        {
          placeholder: '',
          model: '',
          disabled: false
        }
      ]
    },
    {
      label: '审核费',
      prop: 'verifyfee',
      labelcontent: '(复制标签到计算公式)',
      input: [
        {
          placeholder: '',
          model: '',
          disabled: true
        },
        {
          placeholder: '',
          model: '',
          disabled: false
        }
      ]
    },
    {
      label: '咨询服务费',
      prop: 'consultfee',
      labelcontent: '(复制标签到计算公式)',
      input: [
        {
          placeholder: '',
          model: '',
          disabled: true
        },
        {
          placeholder: '',
          model: '',
          disabled: false
        }
      ]
    },
    {
      label: '意外保险',
      prop: 'emergencyfee',
      labelcontent: '(复制标签到计算公式)',
      input: [
        {
          placeholder: '',
          model: '',
          disabled: true
        },
        {
          placeholder: '',
          model: '',
          disabled: false
        }
      ]
    }
  ],
  monthCal: 'monthCal'
}

const JXform2 = {
}

const JXformRules = {
    rules: {
      company: { required: true, message: '请选择公司类型', trigger: 'blur' },
      protype: {required: true, message: '请选产品类型', trigger: 'blur'},
      sort: {required: true, message: '请选择分类', trigger: 'blur'},
      lateFree: {required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入滞纳金'))
            } else if (!Number.isInteger(value)) {
              callback(new Error('请输入数字'))
            } else {
              callback()
            }
          },
          trigger: 'blur'},
      damages: {required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入违约金'))
            } else if (!Number.isInteger(value)) {
              callback(new Error('请输入数字'))
            } else {
              callback()
            }
          },
          trigger: 'blur'}
    }
}

export default {JXform, JXform2, JXformRules, columns}
