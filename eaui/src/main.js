import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import HelloWorld from './components/HelloWorld'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/helloworld', component: HelloWorld },
  { path: '/', components: HelloWorld}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
