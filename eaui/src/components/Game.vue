<template>
  <div>
    <div v-if="outcome=='Win'">
      <h2>Congratulations! You win!</h2>
      <div v-if="game.trophies.length > trophyNum">
        <h3>You received the following trophies</h3>
        <b>{{ game.trophies[trophyNum].name }}</b><br>
        <img :src="getImgUrl(game.trophies[trophyNum].image)"><br>
        <span>{{ game.trophies[trophyNum].description }}</span><br>
        <button class="button mt50" @click="trophyNum++">Next Trophy</button>
      </div>
      <div v-else>
        <h3>Your score was {{ finalScore }}</h3>
      </div>
    </div>
    <div v-else-if="outcome=='Lose'">
      <h2>You lose.</h2>
      <h3>Better luck next time!</h3>
    </div>
    <div class="row game-box" v-else>
      <div class="column room-box">
        <div class="room-details">
          <span v-if="exitMessage">{{ exitMessage }}</span>
          <h2 v-if="enterMessage.length != 0">{{ enterMessage[0].name }}</h2>
          <span v-if="enterMessage.length != 0">{{ enterMessage[0].description }}</span>
        </div>
        <ul class="option-list">
          <li v-for="(option, key) in options" v-bind:key="option.id">
            <button class="player-option text-only" v-on:click="exitRoom(key)">{{ option }}</button>
          </li>
        </ul>
        <button class="button mt50" v-if="betweenRooms" @click="cycleRoom()">Continue</button>
      </div>
      <div class="column inventory-box">
        <h2>Health</h2>
        <span>{{ game.health }}</span>
        <br>
        <h2>Gold</h2>
        <span>{{ game.gold }}</span>
        <br>
        <h2 v-if="game.inventory.length > 0">Inventory</h2>
        <ul class="inventory" v-if="game.inventory.length > 0">
          <p class="row item" v-for="item in game.inventory" :key="item">{{ item }}</p>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import url from '../url'

export default {
  name: "game",
  data() {
    return {
      game: {},
      options: [],
      enterMessage: "",
      exitMessage: "",
      outcome: "",
      trophyNum: 0,
      finalScore: 0,
      betweenRooms: false,
      allTrophies: [
        {
          name: "The Participation Trophy",
          description: "You played the game.",
          image: "simple_trophy",
        },
        {
          name: "The Wish Trophy",
          description: "You made a wish, and got a trophy for it!",
          image: "pool",
        },
        {
          name: "The Beast-Slayer Trophy",
          description: "You defeated the feral wolf in the abyss.",
          image: "wolf",
        },
        {
          name: "On the Brink",
          description: "You entered a room with exactly one health point.",
          image: "one_hp",
        },
        {
          name: "Dual Wield",
          description: "You possessed the Sword and the Magic Sword at the same time.",
          image: "dual_wield",
        },
        {
          name: "Penniless",
          description: "You managed to lose all your gold.",
          image: "zero_gold",
        },
        {
          name: "Clean Bill of Health",
          description: "You won the game with maximum health.",
          image: "max_hp",
        },
        {
          name: "Heh",
          description: "Nice.",
          image: "nice",
        },
      ],
    }
  },
  beforeMount: function() {
    this.game = this.getGame();
    this.game.username = this.getUsername();
    this.enterRoom();
  },
  methods: Object.assign (
    {
      enterRoom() {
        try {
          let requestURL = url + '/enter';

          var axios = require('axios');

          const options = {
            url: requestURL,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              game: this.game,
            },
          }
          axios(options).then(response =>{
            if(response.data === "Failure"){
              this.$toast.open({
                duration: 3000,
                message: 'The abyss seems to be missing a room.',
                position: 'is-bottom',
                type: 'is-danger'
              })
            } else {
              this.exitMessage = "";
              this.enterMessage = response.data.result;
              this.options = response.data.options;
            }
          })
        } catch (e) {
          this.$toast.open({
            duration: 3000,
            message: 'Something is wrong in the abyss. Come back later.',
            position: 'is-bottom',
            type: 'is-danger'
          })
        }
      },
      exitRoom(option) {
        try {
          let requestURL = url + '/exit';

          var axios = require('axios');

          const options = {
            url: requestURL,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              game: this.game,
              optionID: option,
            },
          }
          axios(options).then(response =>{
            if(response.data === "Failure"){
              this.$toast.open({
                duration: 3000,
                message: 'The abyss seems to be missing a room.',
                position: 'is-bottom',
                type: 'is-danger'
              })
            } else {
              if(response.data.status == "Win") {
                this.endGame("Win");
              } else if (response.data.status == "Lose") {
                this.endGame("Lose");
              } else {
                this.game = response.data.game;
                this.exitMessage = response.data.result;
                this.enterMessage = "";
                this.options = [];
                this.betweenRooms = true;
              }
            }
          })
        } catch (e) {
          this.$toast.open({
            duration: 3000,
            message: 'Something is wrong in the abyss. Come back later.',
            position: 'is-bottom',
            type: 'is-danger'
          })
        }
      },
      cycleRoom() {
        this.betweenRooms = false;
        let potentialRooms = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        //Remove current and recent rooms from potential rooms
        for(var index in this.game.recentRooms) {
          for(let i = 0; i < potentialRooms.length; i++) {
            if(potentialRooms[i] == this.game.recentRooms[index] || potentialRooms[i] == this.game.roomID) {
              potentialRooms.splice(i, 1);
              i--;
            }
          }
        }
        var temp = this.game.roomID;
        var random = Math.floor(Math.random() * potentialRooms.length);
        this.game.roomID = potentialRooms[random];
        potentialRooms[random] = this.game.recentRooms.shift();
        this.game.recentRooms.push(temp);
        this.enterRoom();
      },
      endGame(result) {
        try {
          let requestURL = url + '/endgame';

          var axios = require('axios');

          const options = {
            url: requestURL,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              game: this.game,
              status: result,
            },
          }
          axios(options).then(response =>{
            if(response.data === "Failure"){
              this.$toast.open({
                duration: 3000,
                message: 'An error has occurred.',
                position: 'is-bottom',
                type: 'is-danger'
              })
            } else {
              this.outcome = result;
              this.finalScore = response.data;
              for(var i in this.game.trophies) {
                this.game.trophies[i] = this.allTrophies[this.game.trophies[i]];
              }
            }
          })
        } catch (e) {
          this.$toast.open({
            duration: 3000,
            message: 'Something is wrong in the abyss. Come back later.',
            position: 'is-bottom',
            type: 'is-danger'
          })
        }
      },
      getImgUrl(name) {
        var images = require.context('../assets/', false, /\.png$/)
        return images('./' + name + ".png")
      }
    },
    mapGetters(['getGame', 'getUsername'])
  )
};

</script>


<style scoped>

button {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #2c3e50;
  color: #fff;
}

.player-option:hover {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}


.player-option {
  background:none;
  border:none;
  font-size: 150%;
}

.game-box {
  height: 86vh;
}

.row {
  display: flex;
}

.room-box {
  flex: 75%;
  border-style: solid;
}

.option-list {
  text-align: left;
}

.inventory-box {
  flex: 25%;
  border-style: solid;
  border-left: 0px;
}

h2 {
  font-weight: bold;
  font-size: 200%;
}

.inventory {
  text-align: left;
  border-style: solid;
}

.item {
  background: darkgrey;
  padding: 3px;
}

.item:nth-child(odd) {
  background: silver;
}

</style>
