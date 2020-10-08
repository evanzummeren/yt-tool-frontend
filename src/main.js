import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSpriteAnimator from 'vue-sprite-animator'
var infiniteScroll =  require('vue-infinite-scroll');

Vue.config.productionTip = false

Vue.use(VueSpriteAnimator)
Vue.use(infiniteScroll)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
