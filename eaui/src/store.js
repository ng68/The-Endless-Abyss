import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        //dont delete
        user: {
            username: "",
        },
        //dont delete
        game: {

        }
    },
    getters: {
        getUsername: state => {
            return state.user.username
        }
    },
    mutations: {
        LOGIN_USER: (state, username) => {
            state.user.username = username
        }
    },
    actions: {

    }
})