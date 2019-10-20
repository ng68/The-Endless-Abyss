import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        //Delete later
        teststate: 'helloworld',
        //Delete later
        links: [
            'asd',
            'asd',
            'asd',
        ],
        //delete later
        count: 4,
        //dont delete
        user: {
            username: "",
        },
        //dont delete
        game: {

        }
    },
    getters: {
        //Delete later
        countLinks: state => {
            return state.links.length
        },
        countCount: state => {
            return state.count
        },
        getUsername: state => {
            return state.user.username
        }
    },
    mutations: {
        //delete later
        INCREASE: (state, count) => {
            state.count = count + state.count
        },
        LOGIN_USER: (state, username) => {
            state.user.username = username
        }
    },
    actions: {

    }
})