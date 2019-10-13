
<template>
  <div id="login">
    <div class="box">
              <div class="welcomeHeader">
                <h1>Account Recovery</h1>
                <small>You risk entering the Abyss!</small>
              </div>
              <form>
                <!-- <label for="">Email</label> -->
                <div class="field">
                  <div class="control">
                    <input
                      v-model="email"
                      v-model.trim="login.email"
                      type="text"
                      class="username input"
                      qa-login="username"
                      autofocus
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                <button
                  class="button is-block is-info is-fullwidth mt50"
                  qa-login="reset"
                  @click="onSubmit"
                >
                  Send Recovery Email
                </button>
              </form>
            </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import axios from 'axios'
import url from '../url'

export default {
  name: 'RecoverAccount',
  components: {

  },

  data: () => ({
    email: '',
    login: {}
  }),

  computed: {},

  methods: Object.assign(
    {
      async onSubmit(evt) {
        
        evt.preventDefault()
        if (!this.email) {
          this.$toast.open({
            duration: 5000,
            message: 'Please add an email',
            position: 'is-bottom',
            type: 'is-danger'
          })
        } else {
          try {
            let requestURL = url + '/recovery'

            var axios = require('axios')

            const options = {
              url: requestURL,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              data: {
                email: this.email
              }
            }
            axios(options)
              .then(response =>{
                if(response.data === "Success"){
                 this.$router.push({ name: 'Home' })
                } else {
                this.$toast.open({
                  duration: 5000,
                  message: 'Invalid Email Please Try Again',
                  position: 'is-bottom',
                  type: 'is-danger'
                })
                }
              })
          } catch (e) {
            this.$toast.open({
              duration: 5000,
              message: 'An Error Has Occured Please Try Again',
              position: 'is-bottom',
              type: 'is-danger'
            })
          }
        }
      }
    },
    mapActions(['recoverUser'])
  )
}
</script>

<style scoped>

form {
  width: 300px;
  margin: auto;
}

.welcomeHeader {
  margin-bottom: 12px;
}

</style>

