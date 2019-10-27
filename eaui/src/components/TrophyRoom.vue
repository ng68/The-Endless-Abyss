<template>
  <div id="TrophyRoom">
    <div>
      <h1>Trophy Room</h1>
    </div>
    <div class='trophy-case'>
      <div v-if="trophies[0] == 1" class='trophy' title="You played the game.">
        <img class='trophy-image' src="../assets/simple_trophy.png">
        <span class='trophy-text'>The Participation Trophy</span>
      </div>
      <div v-if="trophies[1] == 1" class='trophy' title="You made a wish, and got a trophy for it!">
        <img class='trophy-image' src="../assets/pool.png">
        <span class='trophy-text'>The Wish Trophy</span>
      </div>
      <div v-if="trophies[2] == 1" class='trophy' title="You defeated the feral wolf in the abyss.">
        <img class='trophy-image' src="../assets/wolf.png">
        <span class='trophy-text'>The Beast-Slayer Trophy</span>
      </div>
      <div v-if="trophies[3] == 1" class='trophy' title="You entered a room with exactly one health point.">
        <img class='trophy-image' src="../assets/one_hp.png">
        <span class='trophy-text'>On the Brink</span>
      </div>
      <div v-if="trophies[4] == 1" class='trophy' title="You possessed the Sword and the Magic Sword at the same time.">
        <img class='trophy-image' src="../assets/dual_wield.png">
        <span class='trophy-text'>Dual Wield</span>
      </div>
      <div v-if="trophies[5] == 1" class='trophy' title="You managed to lose all your gold.">
        <img class='trophy-image' src="../assets/zero_gold.png">
        <span class='trophy-text'>Penniless</span>
      </div>
      <div v-if="trophies[6] == 1" class='trophy' title="You won the game with maximum health.">
        <img class='trophy-image' src="../assets/max_hp.png">
        <span class='trophy-text'>Clean Bill of Health</span>
      </div>
      <div v-if="trophies[7] == 1" class='trophy' title="Nice.">
        <img class='trophy-image' src="../assets/nice.png">
        <span class='trophy-text'>Heh</span>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import url from '../url'

export default {
  name: 'TrophyRoom',
  components: {

  },

  data() {
    return {
      trophies: [0,0,0,0,0,0,0,0]
    }
  },

  created() {
    try {
      let requestURL = url + '/trophies';
      
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
            message: 'Something went wrong accessing your trophies.',
            position: 'is-bottom',
            type: 'is-danger'
          })
        } else {
          for(let i = 0; i < response.data.length; i++) {
            this.trophies[response.data[i].trophy] = 1;
          }
          this.$forceUpdate();
        }
      })
    } catch (e) {
      this.$toast.open({
        duration: 3000,
        message: 'An error occurred.',
        position: 'is-bottom',
        type: 'is-danger'
      })
    }
  },

  methods: Object.assign(
    {
    },
    mapGetters(['getUsername'])
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
  padding-left: 17px;
  padding-right: 17px;
  background-image: url("../assets/shelf.jpg");
}

.trophy-image {
  height: 200px;
}

.trophy-text {
  font-weight: bold;
}

</style>
