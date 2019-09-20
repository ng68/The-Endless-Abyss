<template>
  <div>
    <div>
      <h1>Trophy Room</h1>
    </div>
    <div class='trophy-case'>
      <div class='trophy' v-for="trophy in trophies">
        <img class='trophy-image' src="{{ trophy.img }}">
        <span class='trophy-text'>{{ trophy.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrophyRoom',

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
  background-size: 100cw 100ch;
}

.trophy-image {
  height: 200px;
}

.trophy-text {
  font-weight: bold;
}

</style>