import Vue from 'vue'
import Firebase from 'firebase'
import Router from 'vue-router'

Vue.use(Router)

import main from 'components/main'
import login from 'components/login'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
    	path: '/login',
    	component: login,
	}	
  ]
})
