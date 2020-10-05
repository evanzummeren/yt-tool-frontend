import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSpriteAnimator from 'vue-sprite-animator'

Vue.config.productionTip = false

Vue.use(VueSpriteAnimator)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
