<template>
  <div class="row game-screen">
    <div class="column room-screen">
      <h2>{{currentRoom.name}}</h2>
      <p>{{currentRoom.description}}</p>
      <ul>
        <li v-for="option in options" v-bind:key="option.id">
        </li>
      </ul>
      <button @click="cycleRoom">New Room</button>
    </div>y
    <div class="column inventory">
      <Inventory></Inventory>
    </div>
  </div>
</template>

<script>

// import { mapActions, mapGetters } from "vuex";

import Inventory from './Inventory'

import Room from './Room'

export default {
  name: "game",
  data: () => ({
    currentRoom: "Tavern",
    rooms: ["Trader", "Campfire", "Hole", "Trapdoor"],
    recentRooms: ["Levers", "Chest", "Goblin"]
  }),
  methods: {
    cycleRoom() {
      var random = Math.floor(Math.random() * this.rooms.length);
      var temp = this.currentRoom;
      this.currentRoom = this.rooms[random];
      this.rooms[random] = this.recentRooms.shift();
      this.recentRooms.push(temp);
    }
  },
  components: {
    Inventory,
  }
};

</script>


<style scoped>

.game-screen {
  height: 86vh;
}

.row {
  display: flex;
}

.room-screen {
  flex: 75%;
}

.room-screen {
  border-style: solid;
}

.inventory {
  flex: 25%;
  border-style: solid;
  border-left: 0px;
}

</style>
