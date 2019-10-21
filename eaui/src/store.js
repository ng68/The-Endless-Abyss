import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        //dont delete
        user: {
            username: "",
            authenticated: false
        },
        //dont delete
        game: {
            username: "",
            roomID: 1,
            recentRooms: [12,13,14,15],
            health: 100,
            gold: 20,
            inventory: [],
            trophies: [],
        }

    },
    getters: {
        getUsername: state => {
            return state.user.username
        },
        getGame: state => {
            return state.game
        }
    },
    mutations: {
        LOGIN_USER: (state, username) => {
            state.user.username = username
        },
        UPDATE_GAME: (state, game) => {
            state.game = game
        },
    },
    actions: {
        newGame: (context) => {
            let game = {
                username: "",
                roomID: 1,
                recentRooms: [2,3,4],
                health: 100,
                gold: 20,
                inventory: [],
                trophies: [],
            }
            context.commit('UPDATE_GAME', game)
        },
        continueGame: (context, game) => {
            context.commit('UPDATE_GAME', game);
        },
    }
})