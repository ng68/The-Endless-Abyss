<template>
  <div id="login">
    <div class="box">
              <div class="welcomeHeader">
                <h1>Login</h1>
                <small>You are now entering the Abyss!</small>
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
                <a
                  qa-login="login"
                  @click="onForgotPassword"
                >
                  Forgot Your Password?
                </a>
                <button
                  class="button is-block is-info is-fullwidth mt50"
                  qa-login="login"
                  @click="onSubmit"
                >
                  Login
                </button>
                <span>Don't have an account?</span><a 
                  qa-login="login"
                  @click="onCreateAccount"
                >
                  Sign Up
                </a>
              </form>
              <h1>{{ teststate }}</h1>
              <h1>{{ countLinks }}</h1>
              <h1>{{ count }}</h1>
              <button @click="increasecount">test</button>
            </div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import url from '../url'

export default {
  name: 'Login',

  data: () => ({
    username: '',
    password: '',
    login: {},
    localcount: 4,
  }),

  computed: {
    ...mapState([
      'teststate',
      'count'
    ]),
    ...mapGetters([
      //delete
      'countLinks'
    ]),
  },

  methods: Object.assign(
    {
      ...mapMutations([
        'INCREASE',
        'LOGIN_USER'
      ]),
      //delete
      increasecount() {
        this.INCREASE(this.localcount)
      },
      loginuser(username) {
        this.LOGIN_USER(username)
      },
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
            let requestURL = url + '/login'

            var axios = require('axios')

            const options = {
              url: requestURL,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              data: {
                username: this.login.username,
                password: this.login.password
              }
            }
            axios(options)
              .then(response =>{
                if(response.data === "Success"){
                  this.loginuser(this.login.username)
                 this.$router.push({ name: 'MainMenu' })
                }
              })

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
      onCreateAccount() {
        this.$router.push({ name: 'CreateAccount' })
      },
      onForgotPassword() {
        this.$router.push({ name: 'RecoverAccount' })
      },
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

