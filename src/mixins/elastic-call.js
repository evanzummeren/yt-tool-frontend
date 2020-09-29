const axios = require('axios');
import serverCredentials from './server.json';

export default {
  methods: {
    // dit verplaatsen naar main search
    generalCall(str) {
      console.log(serverCredentials)
      axios.post(serverCredentials.url, {
        "size": 20,
        "from": 0,
        "query": {
          "bool": {
            "must": [
              {
                "match": {
                  "line": `${str}`
                }
              },
              {
                "has_parent": {
                  "parent_type": "video",
                  "query": {
                    "bool": {
                      "must": [
                        {
                          "match": {
                            "online": false
                          }
                        },
                        {
                          "match": {
                            "category": "altright"
                          }
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        }
      })
      .then(function (response) {
        console.log(this);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}