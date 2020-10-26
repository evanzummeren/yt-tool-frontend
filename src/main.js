import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSpriteAnimator from 'vue-sprite-animator';
import SimpleAnalytics from "simple-analytics-vue";

var infiniteScroll =  require('vue-infinite-scroll');

Vue.config.productionTip = false

export const bus = new Vue()

Vue.use(VueSpriteAnimator)
Vue.use(infiniteScroll)
Vue.use(SimpleAnalytics, { domain: "api.raditube.com" });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
