<template>
  <div class="container">

    <SearchMenu v-if="showSearchMenu"/>
    <!-- <SearchMenu v-if="true"/> -->

    <header>
      <input 
        class="searchinput"
        v-model="keyword" 
        v-on:keyup.enter="performSearch"
        placeholder="search">
      <div class="categories" @click="openSearchMenu">qanon, breadtube</div>
      <div class="categories" @click="openSearchMenu">sort</div>
      <div class="categories" @click="openSearchMenu">10.01.2008 - 10.04.2020</div>
      <div class="verticalline--top"></div>
      <div class="verticalline--header"></div>
      <div class="menu">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.0762 1.84757H0.923788C0.406467 1.84757 0 1.44111 0 0.923787C0 0.406467 0.406467 0 0.923788 0H15.0762C15.5935 0 16 0.406467 16 0.923787C16 1.44111 15.5935 1.84757 15.0762 1.84757Z" fill="white"/>
          <path d="M15.0762 5.54289H0.923788C0.406467 5.54289 0 5.13642 0 4.6191C0 4.10178 0.406467 3.69531 0.923788 3.69531H15.0762C15.5935 3.69531 16 4.10178 16 4.6191C16 5.13642 15.5935 5.54289 15.0762 5.54289Z" fill="white"/>
          <path d="M15.0762 9.23771H0.923788C0.406467 9.23771 0 8.83125 0 8.31392C0 7.7966 0.406467 7.39014 0.923788 7.39014H15.0762C15.5935 7.39014 16 7.7966 16 8.31392C16 8.83125 15.5935 9.23771 15.0762 9.23771Z" fill="white"/>
        </svg>
      </div>
    </header>

    <ul>
      <li v-for="(result, index) in results" v-bind:key="index">
        <Result 
          :additionalmeta="result.inner_hits.video.hits.hits[0]._source"
          :resultline="result"
          :preresult="results[index - 1]"
          :nextresult="results[index + 1]" />
      </li>
    </ul>

  </div>
</template>

<script>
import Result from '../components/Result.vue';
import SearchMenu from '../components/SearchMenu.vue';

// import anime from 'animejs/lib/anime.es.js';
const axios = require('axios');

import serverCredentials from '../mixins/server.json';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// http://localhost:8080/search/q/%22q%20says%22/cat/blabla

export default {
  name: 'Home',
  components: {
    Result, SearchMenu
  },
  data: function() {
    return {
      searchOptions: {
        categories: ['altright'],
        sort: "",
        filter: []
      },
      showSearchMenu: false,
      keyword: "",
      results: []
    }
  },
  beforeCreate: function() {
  },
  mounted: function() {
    this.keyword = this.$route.params.query;
    this.processCall(this.$route.params.query);
  },
  methods: {
    openSearchMenu() {
      this.showSearchMenu = !this.showSearchMenu;
    },
    performSearch() {
      this.results = [];
      this.processCall(this.keyword);
      this.$router.push(`../../../../search/q/${this.keyword}/cat/blabla`)
    },
    processCall(str) {
      // var resp = this.generalCall(this.$route.params.query);
      // console.log(resp);

      var _this = this;

      console.log(str);

      axios.post(serverCredentials.url, {
        "size": 100,
        "from": 0,
        "sort" : [
          { "date" : {"order" : "desc"} },
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
        console.log('response coming in')
        response.data.hits.hits.forEach(el => {
          _this.results.push(el)
        });
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
  position: fixed;
  z-index: 100;
  width: calc(100% - 2rem);
  background: black;
}

.verticalline--top {
  width: 1px;
  height: 2rem;
  background: #474747;
  position: absolute;
  margin-top: -2rem;
  right: calc(3rem + 1px);
}

.verticalline--header {
  width: 1px;
  height: 2rem;
  background: #8A8A8A;
  position: absolute;
  right: calc(3rem + 1px);
}

.menu {
  width: 16px;
  height: 16px;
  position: absolute;
  top: -.5rem;
  right: 2.6rem;
  cursor: pointer;
}

.searchinput:hover {
  background-color: #f1f1f1;
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
  position: absolute;
  left: 2rem;
  top: 2rem;
  border-left: 1px solid #4F23FF;
  border-right: 1px solid #8A8A8A;
}

ul {
  margin: 2rem 0 0 0;
  padding: 0;
  list-style-type: none;
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
  cursor: pointer;
}

.categories:hover {
  animation-duration: 2s;
  animation-name: flicker;
  animation-timing-function:linear;
  animation-fill-mode:forwards;
  animation-iteration-count: 1;
}


@keyframes flicker {
  0% {
  background-color: black;
  color: white;
  }

  10% {
  background-color: #B2B2B2;
  color: black;
  }

  20% {
  background-color: black;
  color: white;
  }


  60% {
  background-color: black;
  color: white;
  }


}
</style>