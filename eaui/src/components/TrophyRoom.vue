<template>
  <div id="TrophyRoom">
    <div>
      <h1>Trophy Room</h1>
    </div>
    <div class='trophy-case'>
      <div class='trophy' title="This is a basic placeholder trophy">
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <span class='trophy-text'>Simple Trophy</span>
      </div>
      <div class='trophy' title="This is a basic placeholder trophy">
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <span class='trophy-text'>Simple Trophy</span>
      </div>
      <div class='trophy' title="This is a basic placeholder trophy">
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <span class='trophy-text'>Simple Trophy</span>
      </div>
      <div class='trophy' title="This is a basic placeholder trophy">
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <span class='trophy-text'>Simple Trophy</span>
      </div>
      <div class='trophy' title="This is a basic placeholder trophy">
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <span class='trophy-text'>Simple Trophy</span>
      </div>
      <div class='trophy' title="This is a basic placeholder trophy">
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <span class='trophy-text'>Simple Trophy</span>
      </div>
      <div class='trophy' title="This is a basic placeholder trophy">
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <span class='trophy-text'>Simple Trophy</span>
      </div>
      <div class='trophy' title="This is a basic placeholder trophy">
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <span class='trophy-text'>Simple Trophy</span>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'TrophyRoom',
  components: {

  },

  data: () => ({
    trophies: []
  }),

  computed: Object.assign(
    {
      getTrophies() {
        this.trophies = this.getTrophies();
      }
    },
    mapGetters(['user'])
  ),

  methods: Object.assign(
    {

    },
  )

}

</script>

<style scoped>

.trophy-case {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.trophy {
  display: flex;
  flex-flow: column nowrap;
  display: -webkit-flex; /* Safari */
  -webkit-flex-flow: column nowrap; /* Safari 6.1+ */
  justify-content: space-between;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  background-image: url("../assets/shelf.jpg");
}

.trophy-image {
  height: 200px;
}

.trophy-text {
  font-weight: bold;
}

</style>
