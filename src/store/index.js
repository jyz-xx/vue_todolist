import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, val) {
      state.inputValue = val
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({
        data
      }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  modules: {}
})
