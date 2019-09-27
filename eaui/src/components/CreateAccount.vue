
<template>
  <div id="login">
    <div class="box">
              <div class="welcomeHeader">
                <h1>Register</h1>
                <small>You risk entering the Abyss!</small>
              </div>
              <form>
                <!-- <label for="">Username</label> -->
                <div class="field">
                  <div class="control">
                    <input
                      v-model="username"
                      v-model.trim="login.username"
                      type="text"
                      class="username input"
                      qa-login="username"
                      autofocus
                      placeholder="Username"
                    />
                  </div>
                </div>
                <!-- <label for="">Password</label> -->
                <div class="field">
                  <div class="control">
                    <input
                      v-model="password"
                      v-model.trim="login.password"
                      type="password"
                      class="password input"
                      qa-login="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <!-- <label for="">Confirm Password</label> -->
                <div class="field">
                  <div class="control">
                    <input
                      v-model="passwordAgain"
                      v-model.trim="login.passwordAgain"
                      type="password"
                      class="passwordAgain input"
                      qa-login="passwordAgain"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
                <!-- <label for="">Email</label> -->
                <div class="field">
                  <div class="control">
                    <input
                      v-model="email"
                      v-model.trim="login.email"
                      type="text"
                      class="email input"
                      qa-login="email"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                <button
                  class="button is-block is-info is-fullwidth mt50"
                  qa-login="Creat Account"
                  @click="onSubmit"
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
  name: 'CreateAccount',
  components: {

  },

  data: () => ({
    email: '',
    username: '',
    password: '',
    passwordAgain: '',
    login: {}
  }),

  computed: {},

  methods: Object.assign(
    {
      async onSubmit(evt) {
        
        evt.preventDefault()
        if (!this.username || !this.password || !this.email || !this.passwordAgain) {
          this.$toast.open({
            duration: 5000,
            message: 'Please fill the form completely',
            position: 'is-bottom',
            type: 'is-danger'
          })
        } else if (this.password !== this.passwordAgain) {
            this.$toast.open({
                duration: 5000,
                message: 'Your passwords do not match',
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
              message: 'Sorry That Username is taken, Please Try Another',
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

.button {
  margin-top: 10px;
  margin-bottom: 10px;
}

.welcomeHeader {
  margin-bottom: 12px;
}

</style>
