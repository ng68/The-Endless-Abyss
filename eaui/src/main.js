import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import store from './store'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import RecoverAccount from './components/RecoverAccount'
import HelloWorld from './components/HelloWorld'
import Buefy from 'buefy'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/helloworld', name: 'HelloWorld', component: HelloWorld },
  { path: '/createaccount', name: 'CreateAccount', component: CreateAccount },
  { path: '/login', name: 'Login', component: Login},
  { path: '/recoveraccount', name: 'RecoverAccount', component: RecoverAccount},
<<<<<<< HEAD
  //{ path: '/', name: 'Login', components: 'Login'}
=======
  { path: '/', name: 'Login', component: Login}
>>>>>>> master
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})
Vue.use(axios)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
