<template>
  <div class="container">

    <header>
      <input 
        v-model="keyword" 
        v-on:keyup.enter="performSearch"
        placeholder="search">
      <div class="categories">qanon, breadtube</div>
      <div class="categories">sort</div>
      <div class="categories">10.01.2008 - 10.04.2020</div>
    </header>



      <ul>
        <Result />
        <li v-for="(result, index) in results" v-bind:key="result">
          <Result 
            :additionalmeta="result.inner_hits.video.hits.hits[0]._source"
            :resultline="result.highlight.line[0]"
            :preresult="results[index - 1]" />
          <!-- {{ result }} -->
        </li>
      </ul>

  </div>
</template>

<script>
import Result from '../components/Result.vue';
// import ElasticCall from '../mixins/elastic-call.js';
const axios = require('axios');
import serverCredentials from '../mixins/server.json';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    Result
  },
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

      console.log(str);

      axios.post(serverCredentials.url, {
        "size": 20,
        "from": 0,
        "sort" : [
          { "date" : {"order" : "desc"}},
          // "_score"
        ],
        "query": {
          "bool": {
            "must": [
              {
                "simple_query_string": {
                  "fields": ["line"],
                  "query": `${str}`
                  // "fuzziness": "AUTO"
                }
              },
              {
                "has_parent": {
                  "parent_type": "video",
                  "inner_hits": {},
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
                            "category": "qanon"
                          }
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        },
        "highlight" : {
          "pre_tags" : ["<span class='hit'>"],
          "post_tags" : ["</span>"],
          "fields" : {
            "line" : {}
        }
    }
      })
      .then(function (response) {
        console.log('bla')
        response.data.hits.hits.forEach(el => {
          console.log(el)
          _this.results.push(el)
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
header {
  border-top: 1px solid #474747;
  border-bottom: 1px solid #8A8A8A;
  height: 2rem;
  display: flex;
}

input { 
  outline: none !important; 
  -webkit-appearance: none; 
  box-shadow: none !important;
  border: none;
  background: white;
  background-image: url('../assets/icons/search.svg');
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 16px 5px;
  height: 2rem;
  margin-top: -1px;
  width: 24rem;
  border-top: 1px solid #474747;
  border-bottom: 1px solid #8A8A8A;
  font-family: 'Flaco';
  font-size: 1rem;
  color: black;
  padding-left: 3rem;
}

:-webkit-autofill { color: #fff !important; }

.container {
  background: #1D1D1D;
  z-index: 100;
  width: calc(100vw - 5rem);
  height: calc(100vh - 2rem);
  position: absolute;
  left: 2rem;
  top: 2rem;
}

ul {
  margin: 0;
  padding: 0;
}

.categories {
  background-color: #B2B2B2;
  height: calc(2rem - 2px);
  line-height: 2rem;
  padding-left: 1rem;
  width: 15rem;
  font-family: 'Flaco-mono';
  border-left: 1px solid #2F2F2F;
  font-size: .9rem;
}

</style>