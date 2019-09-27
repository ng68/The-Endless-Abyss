import * as types from '../mutation-types'
import Vue from 'vue'
import axios from 'axios'
import url from '../../url'

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
  storeUser(storeUserPayload) {
    
  },
  //Used for login
  authenticateUser( loginPayload ) {
    console.log("hello from auth")
    let requestURL = url + '/login'
    /*axios({
      method: 'POST',
      url: requestURL,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "username": loginPayload.username,
        "password": loginPayload.password
      }
    })*/
    
    axios.post(requestURL, {
      username: loginPayload.username,
      password: loginPayload.password
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    
    )

    /*
    const header = {
        'Content-Type': 'application/json'
    }
    axios.post(requestURL, loginPayload, {
        headers: header
    })*/
  },
  // currently only used to change a user's password
  updateUser(updateUserPayload) {

  },
  //Used for creating a new user
  createUser(createPlayload) {
   
  },
  //Used for reseting passwords
  recoverUser(recoverPayload) {

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
