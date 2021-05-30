import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSpriteAnimator from 'vue-sprite-animator';
import SimpleAnalytics from "simple-analytics-vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";
import amplitude from 'amplitude-js';
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'

var infiniteScroll =  require('vue-infinite-scroll');

// import the styles
Vue.config.productionTip = false;

export const bus = new Vue()

Vue.use(VueSpriteAnimator)
Vue.use(infiniteScroll)
Vue.use(VueGoodTablePlugin)

let amplitudeConfig = amplitude.getInstance();
amplitudeConfig.init("b79dc91978a6ebd27882e8f581c2c36d");

router.afterEach((to) => {
  if (to.params.query) {
    amplitudeConfig.logEvent(`Tool — ${to.name} > ${to.params.query}`)
  } else {
    amplitudeConfig.logEvent(`Tool — ${to.name}`)
  }
})

Sentry.init({
  dsn: "https://e360c7d4ec2d477c8f67d43c11bbbe3b@o471943.ingest.sentry.io/5504671",
  integrations: [
    new VueIntegration({
      Vue,
      tracing: true,
    }),
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

Vue.use(SimpleAnalytics, { 
  domain: "api.raditube.com",
  skip: process.env.NODE_ENV !== "production"
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
