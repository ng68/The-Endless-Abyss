<template>
  <div class="row game-box">
    <div class="column room-box">
      <h2>{{currentRoom}}</h2>
      <p>{{room.description}}</p>
      <ul class="option-list">
        <li v-for="option in room.options">
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

// import { mapActions, mapGetters } from "vuex";

export default {
  name: "game",
  data: () => ({
    currentRoom: "Tavern",
    rooms: ["Trader", "Campfire", "Hole", "Trapdoor"],
    recentRooms: ["Levers", "Chest", "Goblin"],
    room: {
      description: "This is the room.",
      options: [
        "Fight",
        "Run Away",
        "Cry"
      ]
    },
    items: [
      {
        name: "Sword",
        description: "This hits stuff",
      },
      {
        name: "Shield",
        description: "This blocks swords and stuff",
      },
      {
        name: "Potion",
        description: "This heals you",
      },
      {
        name: "Stick",
        description: "It's a stick",
      },
      {
        name: "Paul Bunyan's",
        description: "Where the stuff is good, but not too good, eh?",
      }
    ]
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
