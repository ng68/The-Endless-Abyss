// The Endless Abyss

import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import PublicApp from './views/PublicApp'

//import { isAuthed } from './auth'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
            component: PublicApp,
            children: [
                {
                    path: '/login',
                    name: 'Login',
                    props: true,
                    component: Login,
                    meta: {
                    title: 'Login',
                    requiresAuth: false
                }
        }
      ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    // Check the auth first and redirect if we are not authed
    const needsAuthed = to.matched.some(record => record.meta.requiresAuth)
    if (needsAuthed && !isAuthed()) {
      return next({ name: 'Login' })
    }
  
    // Set the page title
    setTitle(to.meta.title)
    return next()
  })
  
  export default router