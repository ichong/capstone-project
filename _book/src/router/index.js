import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import main from 'components/main'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    }
  ]
})
