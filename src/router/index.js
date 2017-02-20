import Vue from 'vue'
var VueFire = require('vuefire')
import Router from 'vue-router'

Vue.use(Router)
Vue.use(VueFire)

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
