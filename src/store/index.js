import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Vuex 模块引入
import app from '@/store/modules/app'

export default new Vuex.Store({modules: {
    app
  }})
