
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

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
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

