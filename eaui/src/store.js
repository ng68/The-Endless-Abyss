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
            username: "",
            roomID: 15,
            recentRooms: [1,11,12,13,14],
            health: 100,
            gold: 20,
            inventory: [],
            trophies: [0],
        }
    },
    getters: {
        getUsername: state => {
            if(state.user.username == ""){
                state.user.username = localStorage.getItem("username")
            }
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
                roomID: 15,
                recentRooms: [1,11,12,13,14],
                health: 100,
                gold: 20,
                inventory: [],
                trophies: [0],
            }
            context.commit('UPDATE_GAME', game)
        },
        continueGame: (context, game) => {
            context.commit('UPDATE_GAME', game);
        },
    }
})