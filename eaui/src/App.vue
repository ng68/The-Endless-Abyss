<template>
  <div id="app">
    <Navigation v-if="['Login', 'CreateAccount', 'RecoverAccount'].indexOf($route.name) == -1"></Navigation>
    <router-view @authenticated="setAuthenticated"/>
  </div>
</template>

<script>
import 'buefy/dist/buefy.css'
import Navigation from './components/Navigation'

export default {
  name: 'app',
  components: {
    Navigation,
  },
  data() {
    return {
      authenticated: false,
    }
  },
  mounted() {
    if(!this.authenticated) {
      this.$router.replace({ name: "Login" })
    }
  },
  methods: {
    setAuthenticated(status){
      this.authenticated = status
    },
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
  margin: 20px;
}

html {
  background-color: gray;
}

</style>
