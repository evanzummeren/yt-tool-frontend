<template>
  <div class="home">
    <input 
      v-model="keyword" 
      v-on:keyup.enter="performSearch"
      placeholder="search">

      <ul>
        <li v-for="result in results" v-bind:key="result">
          {{ result }}
        </li>
      </ul>

  </div>
</template>

<script>
// import ElasticCall from '../mixins/elastic-call.js';
const axios = require('axios');
import serverCredentials from '../mixins/server.json';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  // components: {
  //   HelloWorld
  // },
  data: function() {
    return {
      keyword: "",
      results: []
    }
  },
  beforeCreate: function() {
  },
  mounted: function() {
    this.processCall(this.$route.params.query);
  },
  methods: {
    performSearch() {
      // console.log(this.message)
      this.$router.push(`../../../../search/q/${this.keyword}/cat/blabla`)
    },
    processCall(str) {
      // var resp = this.generalCall(this.$route.params.query);
      // console.log(resp);

      var _this = this;

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
        console.log('bla')
        response.data.hits.hits.forEach(el => {
          console.log(el)
          _this.results.push(el._source.line)
        });

        // _this.results.push('a')
      })
      .catch(function (error) {
        console.log(error);
      });
    
    }
  }
}
</script>

<style lang="scss" scoped>

</style>