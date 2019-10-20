<template>
  <div>
    <div class="header">
      <h1>You have entered the abyss...</h1>
    </div>
    <div class="navigationButtons">
      <button
        class="button is-block is-info is-fullwidth mt50"
        @click="onNewGame">
        New Game
      </button>
      <button
        class="button is-block is-info is-fullwidth mt50"
        @click="onContinueGame">
        Continue Game
      </button>
      <button
        class="button is-block is-info is-fullwidth mt50"
        @click="onTrophyRoom">
        View my Trophies
      </button>
      <button
        class="button is-block is-info is-fullwidth mt50"
        @click="onLeaderboard">
        Leaderboard
      </button>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import url from '../url'

export default {
  name: 'MainMenu',
  components: {
  },
  data: () => ({
  }),
  computed: {},
  methods: Object.assign(
    {
      onNewGame() {
        this.newGame();
        this.$router.push({ name: 'Game' });
      },
      onContinueGame() {
        try {
          let requestURL = url + '/continue';
          
          var axios = require('axios');

          const options = {
            url: requestURL,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              username: this.getUsername(),
            },
          }
          axios(options).then(response =>{
            if(response.data === "Failure"){
              this.$toast.open({
                duration: 3000,
                message: 'No saved game exists for this user.',
                position: 'is-bottom',
                type: 'is-danger'
              })
            } else {
              let game = response.data;
              console.log(response)
              this.continueGame(game);
              this.$router.push({ name: 'Game' });
            }
          })
        } catch (e) {
          this.$toast.open({
            duration: 3000,
            message: 'Something went wrong.',
            position: 'is-bottom',
            type: 'is-danger'
          })
        }
      },
      onTrophyRoom() {
        //TODO: Retrieve trophy room data
        this.$router.push({ name: 'TrophyRoom' });
      },
      onLeaderboard() {
        //TODO: Retrieve Leaderboard data
        this.$router.push({ name: 'Leaderboard' });
      },
    },
    mapGetters(['getUsername']),
    mapActions(['newGame', 'continueGame']),
  )

}

</script>

<style>

h1 {
  font-size: 300%;
  font-weight: bold;
}

.navigationButtons {
  width: 300px;
  margin: auto;
}

.button {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
