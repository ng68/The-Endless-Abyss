import * as types from '../mutation-types'
import Vue from 'vue'

const getDefautState = () => {
    return {
        user: null//Json with relevant user info
    }
}

const state = getDefautState()

const getters = {
    getUser: state => state.user
}

const actions = {
    authenticateUser() {

    }
}

//mutation types must be added to mutation-types.js
const mutations = {
    [types.STORE_USER](state, storeUserPayload) {
        Vue.set(state, 'user', storeUserPayload)
    }
}