<template>
  <div>
    <form>
        <!-- <label for="">Username</label> -->
        <div class="field">
            <div class="control">
                <p>Old Password</p>
            <input
                v-model="oldPassword"
                type="password"
                class="password input"
                autofocus
                placeholder="Old Password"
            />
            </div>
        </div>
        <!-- <label for="">Password</label> -->
        <div class="field">
            <div class="control">
            <p>New Password</p>
            <input
                v-model="newPassword"
                type="password"
                class="password input"
                placeholder="New Password"
            />
            </div>
        </div>
        <button
            class="button is-block is-info is-fullwidth mt50"
            @click="onSubmit"
        >
            Change
        </button>
        </form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import url from '../url'

export default {
  name: 'ManageAccount',

  data: () => ({
    oldPassword: '',
    newPassword: ''
  }),

  methods: Object.assign({
    async onSubmit(evt) {
        evt.preventDefault()
        if (!this.oldPassword || !this.newPassword) {
          this.$toast.open({
            duration: 5000,
            message: 'Please add a old and new password',
            position: 'is-bottom',
            type: 'is-danger'
          })
        } else {
          try {
            console.log("in try")
            let requestURL = url + '/changepassword'

            var axios = require('axios')

            const options = {
              url: requestURL,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              data: {
                username: this.getUsername(),
                password: this.oldPassword,
                newPassword: this.newPassword
              }
            }
            axios(options)
              .then(response =>{
                if(response.data === "Success"){
                    this.$toast.open({
                    duration: 5000,
                    message: 'Password Successfully Updated',
                    position: 'is-bottom',
                    type: 'is-success'
                    })   
                }else{
                    this.$toast.open({
                    duration: 5000,
                    message: 'Old Password does not match',
                    position: 'is-bottom',
                    type: 'is-danger'
                    }) 
                }
              })

          } catch (e) {
            this.$toast.open({
              duration: 5000,
              message: 'An Error has occured please try again',
              position: 'is-bottom',
              type: 'is-danger'
            })
          }
        }
      },
  },
    mapGetters(['getUsername'])
  )
}

</script>

<style scoped>

div {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}

li.router-link-active {
  background-color: #4CAF50;
  color: white;
}

ul { overflow:auto; }
li { float:left; }
li:last-child { float:right; }

</style>