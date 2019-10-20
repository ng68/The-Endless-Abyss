import * as types from '../mutation-types'
import Vue from 'vue'
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
        if(response.data === "Success"){
          commit(types.STORE_LOGGED_IN, true)
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

  },
  newGameData() {
    this.game = {
      username: this.state.user.username,
      roomID: 1,
      recentRooms: [12,13,14,15],
      health: 100,
      gold: 20,
      inventory: [],
      trophies: [],
    }
  },
  loadGameData(loadGame) {
    this.game.username = this.state.user.username;
    this.game = loadGame;
  },
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
