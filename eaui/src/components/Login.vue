<template>
  <div id="login">
    <div class="box">
              <div class="welcomeHeader">
                <h1>Login</h1>
                <small>You risk entering the Abyss!</small>
              </div>
              <form>
                <label for="">Username</label>
                <div class="field">
                  <div class="control">
                    <input
                      v-model="username"
                      v-model.trim="login.username"
                      type="text"
                      class="username input"
                      qa-login="username"
                      autofocus
                    />
                  </div>
                </div>
                <label for="">Password</label>
                <div class="field">
                  <div class="control">
                    <input
                      v-model="password"
                      v-model.trim="login.password"
                      type="password"
                      class="password input"
                      qa-login="password"
                    />
                  </div>
                </div>
                <button
                  class="button is-block is-info is-fullwidth mt50"
                  qa-login="login"
                  @click="onSubmit"
                >
                  Login
                </button>
                <button class="button is-block is-info is-fullwidth mt50"
                  qa-login="login"
                  @click="onCreateAccount"
                >
                  Create Account
                </button>
              </form>
            </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  components: {

  },

  data: () => ({
    username: '',
    password: '',
    login: {}
  }),

  computed: {},

  methods: Object.assign(
    {
      async onSubmit(evt) {
        
        evt.preventDefault()
        if (!this.username || !this.password) {
          this.$toast.open({
            duration: 5000,
            message: 'Please add a username and password',
            position: 'is-bottom',
            type: 'is-danger'
          })
        } else {
          try {
            await this.authenticateUser(this.login)
            this.$router.push({ name: 'Home', query: { tab: 'sut', page: 1 } })
          } catch (e) {
            this.$toast.open({
              duration: 5000,
              message: 'Incorrect login. Please try again',
              position: 'is-bottom',
              type: 'is-danger'
            })
          }
        }
      },
      async onCreateAccount() {
        this.$router.push({ name: 'CreateAccount' })
      }
    },


    mapActions(['authenticateUser'])
  )
}
</script>

