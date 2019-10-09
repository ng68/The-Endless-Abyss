<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'buefy/dist/buefy.css'
export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html {
  background-color: #a9a9a9;
}

</style>
