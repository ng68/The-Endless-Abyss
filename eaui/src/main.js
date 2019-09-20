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
  { path: '/helloworld', component: HelloWorld },
  { path: '/createaccount', component: CreateAccount },
  { path: '/login', component: Login},
  { path: '/', components: HelloWorld}
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
