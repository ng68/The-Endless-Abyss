import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import HelloWorld from './components/HelloWorld'
import Buefy from 'buefy'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/helloworld', name: 'HelloWorld', component: HelloWorld },
  { path: '/createaccount', name: 'CreateAccount', component: CreateAccount },
  { path: '/login', name: 'Login', component: Login},
  { path: '/', components: 'HelloWorld'}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
