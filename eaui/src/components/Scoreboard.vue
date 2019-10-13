<template>
  <div id="scoreboard">
         
  </div>
</template>

<script>

//import { mapActions } from 'vuex'
import axios from 'axios'
import url from '../url'

export default {
  name: 'Scoreboard',
  components: {

  },

  data: () => ({
      row: [
          {id: 1, name: 'tim', score: 123, gold: 10},
          {id: 2, name: 'steve', score: 456, gold: 123},
          {id: 3, name: 'kenny', score: 1000, gold: 1212},
          {id: 4, name: 'will', score: 12, gold: 1}
      ]
  }),

  computed: {},

  methods: Object.assign(
    {
      
    },
  )
}
</script>

<style scoped>

form {
  width: 300px;
  margin: auto;
}

.button {
  margin-top: 10px;
  margin-bottom: 10px;
}

a {
  text-decoration: underline;
}

.welcomeHeader {
  margin-bottom: 12px;
}

</style>

