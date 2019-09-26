import * as types from '../mutation-types'
import Vue from 'vue'
import Api from '../../services/Api'
import jsonwebtoken from 'jsonwebtoken'

const getDefaultState = () => {
  return {
    user: null
  }
}

const state = getDefaultState()

const getters = {
  user: state => state.user,
}

const actions = {
  storeUser({ commit }, storeUserPayload) {
    commit(types.STORE_USER, storeUserPayload)
  },
  //Used for login
  authenticateUser({ commit }, loginPayload) {
    return Api()
      .get('/api/auth/v1/authenticate/', { auth: loginPayload })
      .then(resp => {
        if (!resp) {
          throw new Error()
        }
        const data = resp.data
        window.localStorage.setItem('jwtToken', data.token)
        window.localStorage.setItem('username', loginPayload.username)

        commit(types.STORE_USER, loginPayload)
      })
  },
  // currently only used to change a user's password
  updateUser({ commit }, updateUserPayload) {
    return Api()
      .put(`/api/auth/v1/account/${updateUserPayload.username}`, updateUserPayload)
      .then(resp => {
        const user = resp.data
        commit(types.STORE_USER, user)
      })
  },
  //Used for creating a new user
  createUser(createPlayload) {
    return Api()
      .get('/api/createuser/', { createPlayload })
      .then(resp => {
        if (!resp) {
          throw new Error()
        }
        const data = resp.data
        window.localStorage.setItem('jwtToken', data.token)

        commit(type.STORE_USER, createPlayload)
      })
  },
  //Used for reseting passwords
  recoverUser(recoverPayload) {
    return Api()
      .put(`/api/recoveruser/${recoverPayload}`, recoverPayload)
  }
}

const mutations = {
  [types.STORE_USER](state, storeUserPayload) {
    Vue.set(state, 'user', storeUserPayload)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  getDefaultState
}
