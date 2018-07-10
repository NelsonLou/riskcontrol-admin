const FormJson = {
  company: '',
  protype: '',
  sort: '',
  checkList: [],
  lateFree: '',
  damages: '',
  content: [
    {
      label: '资料保管费',
      prop: 'custodian',
      radio: {
        status: 0,
        label: '启用',
        check: '',
        model: 'iscustodian'
      },
      input: {
        model: '',
        palceholder: ''
      },
      options: [
        {
          model: '',
          palceholder: '-请选择-',
          sort: [
            {
              label: '456456',
              value: 'shanghai'
            },
            {
              label: 'shanghai',
              value: 'tianjing'
            }
          ]
        },
        {
          model: '',
          sort: [
            {
              label: 'shanghai',
              value: 'nanjing'
            },
            {
              label: 'shanghai',
              value: 'tianjing'
            }
          ]
        }
      ]
    },
    {
      label: '居间费',
      prop: 'custodian',
      radio: {
        status: 0,
        label: '启用',
        check: '',
        model: 'iscustodian'
      },
      input: {
        model: '',
        palceholder: ''
      },
      options: [
        {
          model: '',
          palceholder: '-请选择-',
          sort: [
            {
              label: '234',
              value: 'shanghai'
            },
            {
              label: 'shanghai',
              value: 'xinqian'
            }
          ]
        },
        {
          model: '',
          sort: [
            {
              label: 'xinqian',
              value: 'shanghai'
            },
            {
              label: 'chenkai',
              value: 'shanghai'
            }
          ]
        }
      ]
    },
    {
      label: '平台管理费',
      prop: 'custodian',
      radio: {
        status: 0,
        label: '启用',
        check: '',
        model: 'iscustodian'
      },
      input: {
        model: '',
        palceholder: ''
      },
      options: [
        {
          model: '',
          palceholder: '-请选择-',
          sort: [
            {
              label: 'shanghai',
              value: 'shanghai'
            },
            {
              label: 'shanghai',
              value: 'shanghai'
            }
          ]
        },
        {
          model: '',
          sort: [
            {
              label: 'shanghai',
              value: 'qwe'
            },
            {
              label: 'shanghai',
              value: 'qwe'
            }
          ]
        }
      ]
    }
  ]
}
const columns = [
  {
    label: '序号',
    value: 'id',
    width: '80'
  },
  {
    label: '所属公司',
    value: 'company',
    width: ''
  },
  {
    label: '产品类型',
    value: 'protype',
    width: ''
  },
  {
    label: '滞纳金',
    value: 'lateFree',
    width: '120'
  },
  {
    label: '违约金',
    value: 'damages',
    width: '120'
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
  }
]
export default {FormJson, columns}
