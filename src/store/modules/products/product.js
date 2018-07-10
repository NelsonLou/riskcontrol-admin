import axios from '@/api/axios'
import {Message} from 'element-ui'

const state = {
    productlist: [],
    total: 0,
    loading: true,
    xinqian: 1111,
    // 产品类型验证
    typerules: {
      company: { required: true, message: '请选择公司类型', trigger: 'blur' },
      protype: {required: true, message: '请选产品类型', trigger: 'blur'},
      sort: {required: true, message: '请选择分类', trigger: 'blur'},
      checkList: {required: true,
          validator: (rule, value, callback) => {
            if (value.length === 0) {
              callback(new Error('请至少选择一个适用分类'))
            } else {
              callback()
            }
          },
          trigger: 'blur'},
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

const getters = {
//   get_productlist: state => state.productlist
}

const mutations = {
  // set productlist
  SET_PRODUCTLIST: (state, data) => {
      state.productlist = data.result
      state.total = data.total
      state.loading = false
  }
}

const actions = {
  // get productlist
  handleGetProductList: ({commit}, params) => {
    axios.get('/plist', {
        params
    }).then(res => {
        const data = res.data.data
        commit('SET_PRODUCTLIST', data)
    }).catch(error => {
        console.log(error)
    })
  },

  // remove part productlist
  handleRemoveProductList: ({commit}, params) => {
    axios.get('/plremove', {
        params
    }).then(res => {
        const data = res.data
        console.log(data)
        if (data.code === 1) {
          Message.success(data.message)
        }
    }).catch(error => {
        console.log(error)
    })
  },

  // single info remove
  handleSingleInfoRemove: ({commit}, params) => {
    axios.get('/spremove', {
        params
    }).then(res => {
        const data = res.data.data
        if (data.code === 1) {
          Message.success(data.message)
        }
    }).catch(error => {
        console.log(error)
    })
 }
}

export default {
    state,
    getters,
    mutations,
    actions
}
