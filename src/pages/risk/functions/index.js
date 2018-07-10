import axios from '@/api/axios'
// import {Message} from 'element-ui'

const handleGetTableData = (api, params, fn) => {
    axios.get(api, {
      params
    }).then(res => {
        fn(res)
    }).catch(error => {
      console.log(error)
    })
}

const handleRemoveTableData = (api, params, fn) => {
    axios.post(api, {
      params
    }).then(res => {
        fn(res)
    }).catch(error => {
      console.log(error)
    })
  }

export default {handleGetTableData, handleRemoveTableData}
