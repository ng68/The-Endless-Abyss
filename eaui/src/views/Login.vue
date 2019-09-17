<!-- The Endless Abyss -->

<template>
  <div class="content">
    <div class="welcomeHeader">
        <h1>Login</h1>
        <small>You Seek the Endless Abyss</small>
    </div>    
    <form>
        <label for="">Username</label>
        <div class="field">
            <input
              v-model="username"
              v-model.trim="login.username"
              type="text"
              class="username input"
              qa-login="username"
              autofocus
            />
        </div>
        <div class="field">
            <input 
              v-model="password"
              v-model.trim="login.passowrd"
              type="text"
              class="password input"
              qa-login="password"
            />
        </div>
        <button
            class="button is-block"
            qa-login="login"
            @click="onSubmit"
        >
            Login
        </button>
    </form>
    <div class="passwordReset">
        <p>Forgot your password click to reset</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Login',

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
                    //this.$router.push({ name: 'Home' }) try when router is working
                } catch (e) {
                    this.$toast.open({
                        duration: 5000,
                        message: 'Incorrect login, Please try again',
                        position: 'is-bottom',
                        type: 'is-danger'
                    })
                }
            }
        }
      },
      mapActions(['authenticateUser'])
    )
}
</script>
<!-- Add styles here -->

