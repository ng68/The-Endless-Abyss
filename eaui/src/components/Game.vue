<template>
  <div>
    <component v-bind:is="currentSite" class="site"></component>
    <button @click="cycleSite">New Site</button>
  </div>
</template>

<script>

// import { mapActions, mapGetters } from "vuex";

import Tavern from './sites/Tavern'
import Trader from './sites/Trader'
import Campfire from './sites/Campfire'
import Hole from './sites/Hole'
import Trapdoor from './sites/Trapdoor'
import Levers from './sites/Levers'
import Chest from './sites/Chest'
import Goblin from './sites/Goblin'

export default {
  name: "game",
  data: () => ({
    currentSite: "Tavern",
    sites: ["Trader", "Campfire", "Hole", "Trapdoor"],
    recentSites: ["Levers", "Chest", "Goblin"]
  }),
  methods: {
    cycleSite() {
      var random = Math.floor(Math.random() * this.sites.length);
      var temp = this.currentSite;
      this.currentSite = this.sites[random];
      this.sites[random] = this.recentSites.shift();
      this.recentSites.push(temp);
    }
  },
  computed: {
    currentSitePath: function() {
      return "./sites/" + this.currentSite;
    }
  },
  components: {
    Tavern,
    Trader,
    Campfire,
    Hole,
    Trapdoor,
    Levers,
    Chest,
    Goblin
  }
};

</script>