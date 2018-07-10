const contractForm = {
  columns: [
    {
      value: 'user_id',
      label: '客户编号'
    }, {
      value: 'user_name',
      label: '客户名称'
    }, {
      value: 'user_idcard',
      label: '身份证号'
    }, {
      value: 'amount',
      label: '申请金额(元)'
    }, {
      value: 'month',
      label: '申请期限(月)'
    }, {
      value: 'created_at',
      label: '申请日期'
    }, {
      value: 'status_name',
      label: '状态'
      // formatter: row => row.status === 0
      //   ? '待处理'
      //   : row.status === 1
      //     ? '已处理'
      //     : '未知'
    }
  ],
  formCol: [
    {
      formType: 'number',
      label: '合同编号',
      model: 'contract_sn',
      disabled: true
    }, {
      formType: 'number',
      label: '客户编号',
      model: 'user_id',
      disabled: true
    }, {
      formType: 'input',
      label: '客户姓名',
      model: 'user_name',
      disabled: true
    }, {
      formType: 'number',
      label: '申请金额(元)',
      model: 'amount',
      disabled: true
    }, {
      formType: 'number',
      label: '申请期限(月)',
      model: 'month',
      disabled: true
    }, {
      formType: 'number',
      label: '身份证号',
      model: 'user_idcard',
      disabled: true
    }, {
      formType: 'input',
      label: '所属行业',
      model: 'user_profession',
      disabled: true
    }, {
      formType: 'number',
      label: '最高学历',
      model: 'user_education',
      disabled: true
    }, {
      formType: 'input',
      label: '公司',
      model: 'user_company',
      disabled: true
    }, {
      formType: 'input',
      label: '收入(元)',
      model: 'user_income',
      disabled: true
    }, {
      formType: 'input',
      label: '联系QQ',
      model: 'user_qq',
      disabled: true
    }, {
      formType: 'input',
      label: '联系邮箱',
      model: 'user_email',
      disabled: true
    }, {
      formType: 'input',
      label: '担保人',
      model: 'link_man',
      disabled: true
    }, {
      formType: 'input',
      label: '担保人手机',
      model: 'link_mobile',
      disabled: true
    }, {
      formType: 'input',
      label: '与担保人关系',
      model: 'link_relation',
      disabled: true
    }, {
      formType: 'date',
      dataType: 'datetime',
      label: '受理时间',
      model: 'created_at',
      placeholder: '请选择时间',
      disabled: true
    }, {
      formType: 'date',
      dataType: 'datetime',
      label: '生效时间',
      model: 'start_at',
      placeholder: '请选择时间',
      disabled: true
    }, {
      formType: 'date',
      dataType: 'datetime',
      label: '到期时间',
      model: 'end_at',
      placeholder: '请选择时间',
      disabled: true
    }
    // {
    //     formType: 'checkbox',
    //     label: '多选1',
    //     model: 'checkbox',
    //     options: [
    //         {
    //             label: '1'
    //         },
    //         {
    //             label: '2'
    //         },
    //         {
    //             label: '3'
    //         }
    //     ]
    // }
  ],
  plan_list: [
    {
      formType: 'number',
      label: '计划ID',
      model: 'plan_id',
      disabled: true
    }, {
      formType: 'number',
      label: '合同编号',
      model: 'contract_sn',
      disabled: true
    },
    {
      formType: 'input',
      label: '计划应还',
      model: 'plan_pay_fee',
      disabled: true
    }, {
      formType: 'number',
      label: '当前期数',
      model: 'current_month',
      disabled: true
    }, {
      formType: 'number',
      label: '总分期期数',
      model: 'month',
      disabled: true
    }, {
      formType: 'input',
      label: '状态名称',
      model: 'status_name',
      disabled: true
    }, {
      formType: 'input',
      label: '计划还款时间',
      model: 'plan_pay_date',
      disabled: true
    }, {
      formType: 'number',
      label: '违约金',
      model: 'overdue_fee',
      disabled: true
    }, {
      formType: 'input',
      label: '服务费',
      model: 'interest_fee',
      disabled: true
    }
  ],
  overdue_list: [
    {
      formType: 'input',
      label: '计划ID',
      model: 'plan_id',
      disabled: true
    }, {
      formType: 'input',
      label: '合同编号',
      model: 'contract_sn',
      disabled: true
    },
    {
      formType: 'input',
      label: '当前月',
      model: 'current_month',
      disabled: true
    }, {
      formType: 'input',
      label: '逾期期数',
      model: 'overdue_month',
      disabled: true
    }, {
      formType: 'input',
      label: '总逾期期数',
      model: 'total_overdue_month',
      disabled: true
    }, {
      formType: 'input',
      label: '逾期费',
      model: 'overdue_fee',
      disabled: true
    }, {
      formType: 'input',
      label: '总逾期费',
      model: 'total_overdue_fee',
      disabled: true
    }
  ],
  remind_list: [
    {
      formType: 'input',
      label: '主键ID',
      model: 'log_id',
      disabled: true
    }, {
      formType: 'input',
      label: '合同编号',
      model: 'contract_sn',
      disabled: true
    },
    {
      formType: 'input',
      label: '提醒时间',
      model: 'remind_date',
      disabled: true
    }, {
      formType: 'input',
      label: '手机号',
      model: 'remind_mobile',
      disabled: true
    }, {
      formType: 'input',
      label: '提醒方式',
      model: 'remind_type',
      disabled: true,
      formatter: row => row.remind_type === 1
        ? '电话'
        : '邮件'
    }, {
      formType: 'input',
      label: '提醒人',
      model: 'remind_man',
      disabled: true
    }, {
      formType: 'input',
      label: '提醒结果',
      model: 'remind_result',
      disabled: true,
      formatter: row => row.remind_type === 1
        ? '成功'
        : '失败'
    }, {
      formType: 'input',
      label: '提醒说明',
      model: 'remind_desc',
      disabled: true
    }, {
      formType: 'input',
      label: '创建时间',
      model: 'created_at',
      disabled: true
    }
  ],
  hurry_list: [
    {
      formType: 'number',
      label: '主键ID',
      model: 'log_id',
      disabled: true
    }, {
      formType: 'number',
      label: '合同编号',
      model: 'contract_sn',
      disabled: true
    },
    {
      formType: 'input',
      label: '催收时间',
      model: 'hurry_date',
      disabled: true
    }, {
      formType: 'number',
      label: '催收结果',
      model: 'hurry_result',
      disabled: true,
      formatter: row => row.remind_type === 1
        ? '成功'
        : '失败'
    }, {
      formType: 'number',
      label: '催收方式',
      model: 'hurry_type',
      disabled: true,
      formatter: row => row.remind_type === 1
        ? '电话'
        : '邮件'
    }, {
      formType: 'input',
      label: '催收人',
      model: 'hurry_man',
      disabled: true
    }, {
      formType: 'input',
      label: '催收说明',
      model: 'hurry_desc',
      disabled: true
    }, {
      formType: 'number',
      label: '创建时间',
      model: 'created_at',
      disabled: true
    }
  ],
  formRule: {
    start_at: [
      {
        required: true,
        message: '请选择时间'
      }
    ],
    end_at: [
      {
        required: true,
        message: '请选择时间'
      }
    ]
  },
  options: [
    {
      value: '浙江省',
      label: '浙江省',
      children: [
        {
          value: '宁波市',
          label: '宁波市',
          children: [
            {
              value: '鄞州',
              label: '鄞州'
            }, {
              value: '江东',
              label: '江东'
            }, {
              value: '海曙',
              label: '海曙'
            }
          ]
        }, {
          value: '杭州市',
          label: '杭州市',
          children: [
            {
              value: '下沙',
              label: '下沙'
            }, {
              value: '滨江',
              label: '滨江'
            }
          ]
        }
      ]
    }
  ]
}

export default contractForm
