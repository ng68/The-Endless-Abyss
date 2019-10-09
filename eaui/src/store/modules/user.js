import * as types from '../mutation-types'
import Vue from 'vue'
import axios from 'axios'
import url from '../../url'


const getDefaultState = () => {
  return {
    user: null,
    loggedin: false,
    tester: 'the store is working'
  }
}


const state = getDefaultState()

const getters = {
  user: state => state.user,
  tester: state => state.tester,
  loggedin: state => state.loggedin,
  username: state => state.user.username,
  trophies: state => state.user.trophies,
}

const actions = {
  storeUser(storeUserPayload) {
    
  },
  //Used for login
  authenticateUser({ commit }, loginPayload ) {
    
    let requestURL = url + '/login'

    var axios = require('axios')

    const options = {
      url: requestURL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: loginPayload.username,
        password: loginPayload.password
      }
    }
    axios(options)
      .then(response =>{
        console.log(response.data)
        if(response.data === "Success"){
          commit(types.STORE_LOGGED_IN, true)
          console.log("state of logged in: " + state.loggedin)
        }
      })
    
  },
  // currently only used to change a user's password
  updateUser(updateUserPayload) {
    let requestURL = url + '/update'
    
    axios.post(requestURL, {
      updateUserPayload
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

  },
  //Used for creating a new user
  createUser(createPlayload) {
    console.log(createPlayload.username + " username")
    let requestURL = url + '/create'

    var axios = require('axios')

    const options = {
      url: requestURL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: createPlayload.username,
        password: createPlayload.password,
        email: createPlayload.email
      }
    }
    axios(options)
      .then(response =>{
        if(response.data === "success"){
          state.loggedin = true;
        }
      })

  },
  //Used for reseting passwords
  recoverUser(recoverPayload) {
    let requestURL = url + '/recover'
    
    axios.post(requestURL, {
      recoverPayload
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

  }
}

const mutations = {
  [types.STORE_USER](state, storeUserPayload) {
    Vue.set(state, 'user', storeUserPayload)
  },
  [types.STORE_LOGGED_IN](state, storeUserPayload) {
    Vue.set(state, 'loggedin', storeUserPayload)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  getDefaultState
}
