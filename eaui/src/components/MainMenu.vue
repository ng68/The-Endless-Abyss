<template>
  <div>
    <div class="header">
      <h1>Main Menu</h1>
      <span>You have entered the abyss...</span>
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
        this.newGameData();
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
              username: this.username()
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
              this.loadGameData(response.data);
              this.$router.push({ name: 'Game' });
            }
          })
        } catch (e) {
          this.$toast.open({
            duration: 3000,
            message: 'No saved game exists for this user.',
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
    mapGetters(['username']),
    mapActions(['newGameData', 'loadGameData']),
  )

}

</script>

<style>

.navigationButtons {
  width: 300px;
  margin: auto;
}

.button {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
