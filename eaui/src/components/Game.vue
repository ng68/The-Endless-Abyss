<template>
  <div class="row game-box">
    <div class="column room-box">
      <h2>{{game.room.name}}</h2>
      <p>{{game.room.description}}</p>
      <ul class="option-list">
        <li v-for="option in game.options" v-bind:key="option.id">
          {{option}}
        </li>
      </ul>
      <button @click="cycleRoom">New Room</button>
    </div>
    <div class="column inventory-box">
      <h2>Health</h2>
      <h2>Gold</h2>
      <h2>Inventory</h2>
      <ul class="inventory">
        <li class="row item" v-for="item in items" v-bind:key="item.id">
          <img>
          <span :title="item.description">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import url from '../url'

export default {
  name: "game",
  data: () => ({
    game: this.game(),
  }),
  beforeMount: {
    function: () => {
      enterRoom();
    }
  },
  methods: {
    enterRoom() {
      console.log("entering room");
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
            game: this.game
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
    exitRoom(optionID) {
      
    },
    cycleRoom() {
      var random = Math.floor(Math.random() * this.rooms.length);
      var temp = this.currentRoom;
      this.currentRoom = this.rooms[random];
      this.rooms[random] = this.recentRooms.shift();
      this.recentRooms.push(temp);
    }
  },
  components: {
  }
};

</script>


<style scoped>

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
  font-size: large;
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
