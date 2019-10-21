<template>
  <div>
      <h1>A LEADERBOARD</h1>
      <ul id="example-1">
        <li v-for="item in activeboard" v-bind:key="item.username">
            {{item.username}} - {{item.score}}
        </li>
      </ul>
      <button class="button mt50" @click="onChangeView">{{viewButtonText}}</button>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import url from '../url'

export default {
    name: 'Leaderboard',

    data: () => ({
        leaderboard: [],//all available user scores
        personalboard: [],//current player scores
        activeboard: [],
        isLeaderboardActive: true,
        viewButtonText: "See my scores",
    }),

    computed: {
        
    },

    beforeMount() {
            //Global leaderboards
            try {
                let requestURL = url + "/score"

                var axios = require('axios')

                const options = {
                    url: requestURL,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                axios(options)
                    .then(response =>{
                        if(response.data !== null){
                            this.leaderboard = response.data
                            this.activeboard = response.data
                        }
                    })

                const options2 = {
                    url: requestURL,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        username: this.getUsername()
                    }
                }
                axios(options2)
                    .then(response =>{
                        if(response.data !== null){
                            this.personalboard = response.data
                        }
                    })
            } catch (e) {
                //response for bad thing
            }
    },

    methods: Object.assign ({
        onChangeView(){
            if(this.isLeaderboardActive){
                this.isLeaderboardActive = false
                this.activeboard = this.personalboard
                this.viewButtonText = "See all scores"
                return
            }
            this.isLeaderboardActive = true
            this.activeboard = this.leaderboard
            this.viewButtonText = "See my scores"
        },
        ...mapGetters(['getUsername'])
    })
}

</script>

<style scoped>

button {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #2c3e50;
  color: #fff;
}

</style>