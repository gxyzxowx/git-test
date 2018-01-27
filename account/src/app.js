// import pullToRefresh from './directives/pullToRefresh'
// import infiniteScroll from './directives/infiniteScroll'
import * as filters from './filters'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import app from './main'
import routerConfig from './router'


// Router
Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: true,
  history: true
  // saveScrollPosition: true,
  // suppressTransitionError: true
})

routerConfig(router)

// Resource
Vue.use(VueResource)

Vue.http.options.root = process.env.NODE_ENV === 'development' ? 'src/assets/data' : '/sui-app/static/data'
Vue.http.options.emulateJSON = true

// Filters

Vue.filter('char', filters.setChar)

router.start(app, '#app')

window.router = router
