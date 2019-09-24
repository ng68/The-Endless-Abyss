import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import * as types from './mutation-types'

Vue.use(Vuex)

const initialState = {
  user: user.getDefaultState(),
}

export default new Vuex.Store({
  modules: {
    user,
  },
  actions: {
    resetStores({ commit }) {
      commit(types.RESET_STORES)
    }
  },
  mutations: {
    [types.RESET_STORES](state) {
      Object.keys(state).forEach(key => {
        Object.assign(state[key], initialState[key])
      })
    }
  }
})
