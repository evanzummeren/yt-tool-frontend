const axios = require('axios');
import serverCredentials from './server.json';

export default {
  methods: {
    apiCall() {
      console.log(serverCredentials)
      axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}