<template>
  <div>
    <div class="header">
      <h1>Main Menu</h1>
      <span>You have entered the abyss...</span>
    </div>
    <div class="navigationButtons">
      <button
        class="button is-block is-info is-fullwidth mt50"
        @click="onNewGame"
      >
        New Game
      </button>
      <button
        class="button is-block is-info is-fullwidth mt50"
        @click="onContinueGame"
      >
        Continue Game
      </button>
      <button
        class="button is-block is-info is-fullwidth mt50"
        @click="onTrophyRoom"
      >
        View my Trophies
      </button>
      <button
        class="button is-block is-info is-fullwidth mt50"
        @click="onLeaderboard"
      >
        Leaderboard
      </button>
    </div>
  </div>
</template>

<script>

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
      //   //TODO: New Game data
        this.$router.push({ name: 'Game' })
      },
      onTrophyRoom() {
        //TODO: Retrieve trophy room data
        this.$router.push({ name: 'TrophyRoom' })
      },
      onLeaderboard() {
        //TODO: Retrieve Leaderboard data
        this.$router.push({ name: 'Leaderboard' })
      },
    },
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
