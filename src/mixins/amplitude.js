const amplitude = require('amplitude-js');

export default {
  install: (Vue, { apiKey }) => {
    amplitude.getInstance().init(apiKey);

    // eslint-disable-next-line
    Vue.prototype.$amplitude = amplitude;
  },
};