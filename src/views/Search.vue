<template>
  <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScroll.busy" infinite-scroll-distance="10">
    <Ngram v-if="view === 'text'" />

    <SearchMenu 
      v-if="showSearchMenu"
      :checkedCategories="searchOptions.categories"
      :checkedOnlineOffline="searchOptions.online" />

    <header>
      <input 
        class="searchinput"
        v-model="keyword" 
        v-on:keyup.enter="performSearch"
        placeholder="search">
      <div class="categories" @click="openSearchMenu">categories</div>
      <div class="categories" @click="openSearchMenu">sort</div>
      <div class="categories" @click="openSearchMenu">filters</div>
      <!-- <div class="verticalline--top"></div> -->
      <!-- <div class="verticalline--header"></div> -->
      <!-- <div class="menu"> -->
        <!-- <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg"> -->
          <!-- <path d="M15.0762 1.84757H0.923788C0.406467 1.84757 0 1.44111 0 0.923787C0 0.406467 0.406467 0 0.923788 0H15.0762C15.5935 0 16 0.406467 16 0.923787C16 1.44111 15.5935 1.84757 15.0762 1.84757Z" fill="white"/> -->
          <!-- <path d="M15.0762 5.54289H0.923788C0.406467 5.54289 0 5.13642 0 4.6191C0 4.10178 0.406467 3.69531 0.923788 3.69531H15.0762C15.5935 3.69531 16 4.10178 16 4.6191C16 5.13642 15.5935 5.54289 15.0762 5.54289Z" fill="white"/> -->
          <!-- <path d="M15.0762 9.23771H0.923788C0.406467 9.23771 0 8.83125 0 8.31392C0 7.7966 0.406467 7.39014 0.923788 7.39014H15.0762C15.5935 7.39014 16 7.7966 16 8.31392C16 8.83125 15.5935 9.23771 15.0762 9.23771Z" fill="white"/> -->
        <!-- </svg> -->
      <!-- </div> -->
    </header>

    <Datavis 
      :aggs="aggsResults"
      v-if="view === 'datavis'" />

    <Embed 
      :ytlink="embed.dataUrl"
      v-if="embed.open && view === 'text'" />

    <ul v-if="view === 'text'">
      <li v-for="(result, index) in results" v-bind:key="index">
        <Result 
          :additionalmeta="result._source"
          :resultline="result"
          :preresult="results[index - 1]"
          :nextresult="results[index + 1]" />

      </li>
    </ul>

    <div class="statusbar" v-if="view === 'text'">
      <div class="statusbar__spinnercontainer">
        <div class="spinner" v-if="infiniteScroll.busy">
          <div class="spinner__insert"></div>
        </div>
      </div>
      <div class="statusbar__textcontainer">
        {{this.resultsMetadata.results}} results, showing 50
      </div>
    </div>

  </div>
</template>

<script>
import Result from '../components/Result.vue';
import SearchMenu from '../components/SearchMenu.vue';

import Embed from '../components/Embed.vue'
import Ngram from '../components/Ngram.vue'
import Datavis from '../components/Datavis.vue'
// import anime from 'animejs/lib/anime.es.js';
const axios = require('axios');

import {bus} from '../main.js'

import serverCredentials from '../mixins/server.json';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// http://localhost:8080/search/q/%22q%20says%22/cat/blabla

export default {
  name: 'Home',
  components: {
    Result, SearchMenu, Embed, Datavis, Ngram
  },
  data: function() {
    return {
      view: "text",
      embed: {
        dataUrl: "",
        open: false
      },
      searchOptions: {
        categories: ['altright', 'althealth'],
        sort: "desc",
        online: [true, false],
        filter: []
      },
      showSearchMenu: false,
      keyword: "",
      infiniteScroll: {
        busy: false,
        size: 50,
        pos: 0
      },
      resultsMetadata: {
        results: 0
      },
      results: [],
      aggsResults: {}
    }
  },
  mounted: function() {
    this.keyword = this.$route.params.query;
    this.searchOptions.categories = this.$route.params.categories.split(",")
    this.formQuery(this.$route.params.query, this.searchOptions.categories, false);

    bus.$on('triggerSwitch', this.switchView)
  },
  methods: {
    switchView: function(type) {
      this.view = type;

      if (type === 'datavis') {
        this.formQuery(this.$route.params.query, this.searchOptions.categories, true);
      }

      console.log(type)
    },

    loadMore: function() {
      this.infiniteScroll.busy = true;
      this.infiniteScroll.pos = this.infiniteScroll.pos + this.infiniteScroll.size;

      var _this = this;

      setTimeout(() => {
        _this.formQuery(_this.keyword, _this.searchOptions.categories, false)
        this.infiniteScroll.busy = false;
      }, 1000);
    },
    triggerEmbed(str) {
      this.embed.dataUrl = str;
      this.embed.open = true;
    },
    closeThisEmbed() {
      this.embed.open = false;
    },
    openSearchMenu() {
      this.showSearchMenu = !this.showSearchMenu;
    },
    passCategories(arr) {
      this.searchOptions.categories = arr;
    },
    passOnline(arr) { this.searchOptions.online = arr; },
    passSort(type) { 
      console.log(type);
      this.searchOptions.sort = type },
    performSearch() {
      this.results = [];
      this.infiniteScroll.pos = 0;
      this.formQuery(this.keyword, this.searchOptions.categories, false);
      this.showSearchMenu = false;
      console.log(this.searchOptions.categories);
      this.$router.push(`../../../../search/q/${this.keyword}/cat/${this.stitchCategories()}`)
    },
    stitchCategories() {
      let str = this.searchOptions.categories.join(",");
      return str;
    },
    formQuery(str, cat, agg) {
      console.log('search cat ', cat);

      let aggSettings = {};
      let highlightSettings = {};

      if (agg === true) { // generate channel agg
        aggSettings = {
          "channels": {
            "terms": {
              "field": "user",
              "size": 50
            }
          },
          "categories": {
            "terms": {
              "field": "category",
              "size": 10
            }
          },
          "removed": {
            "terms": {
              "field": "online",
              "size": 2
            }
          },
          "mentions_over_time": {
            "date_histogram": {
              "field": "date",
              "interval": "month"
            }
          }
        }
      } else if (agg === false) {
        aggSettings = {
          "mentions_over_time": {
            "date_histogram": {
              "field": "date",
              "interval": "month"
            }
          }
        }

        highlightSettings = {
          "pre_tags" : ["<span class='hit'>"],
          "post_tags" : ["</span>"],
          "fields" : {
            "line" : {}
          }
        }
      }

      let query = {
        "size": this.infiniteScroll.size,
        "from": this.infiniteScroll.pos,
        "sort" : [
          { "date" : { "order" : this.searchOptions.sort } },
          // "_score"
        ],
        "query": {
          "bool": {
            "must": [ {
              "query_string": {
                "query": `${str}`,
                "default_field": "line" 
                }
              }, {
                "terms": { "online": this.searchOptions.online } 
              }, {
                "terms": { "category": this.searchOptions.categories }
              }

            ]
        }},
        "aggs": aggSettings,
        "highlight" : highlightSettings
      }

      if (agg === true) {
        this.processCall(query, true);
      } else {
        this.processCall(query, false);

      }
    },
    processCall(query, agg) {
      var _this = this;

      axios.post(serverCredentials.url, query)
      .then(function (response) {
        console.log(response)

        if ( agg === false ) {
          _this.resultsMetadata.results = response.data.hits.total;
          response.data.hits.hits.forEach( el => {
            // console.log(el)
            _this.results.push( el )
          });
        } else if ( agg === true ) {
          _this.aggsResults = response.data.aggregations;
          console.log(_this.aggsResults);
        }
      })
      .catch( function (error) {
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

// .verticalline--top {
//   width: 1px;
//   height: 2rem;
//   background: #474747;
//   position: absolute;
//   margin-top: -2rem;
//   right: calc(3rem + 1px);
// }

// .verticalline--header {
//   width: 1px;
//   height: 2rem;
//   background: #8A8A8A;
//   position: absolute;
//   right: calc(3rem + 1px);
// }

// .menu {
//   width: 16px;
//   height: 16px;
//   position: absolute;
//   top: -.5rem;
//   right: 2.6rem;
//   cursor: pointer;
// }

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

/* STATUS BAR */

.statusbar {
  width: 33vw;
  line-height: 2rem;
  border-top: 1px solid #8A8A8A;
  // background: blue;
  position: fixed;
  display: flex;
  bottom: 0;
  z-index: 10000;
  background: linear-gradient(90deg, rgba(29,29,29,1) 0%, rgba(29,29,29,1) 33%, rgba(29,29,29,0) 100%);

}

.statusbar__spinnercontainer {
  height: 1rem;
  width: 1rem;
  margin-left: 1.6rem;
  margin-top: 0.4rem;
}

.statusbar__textcontainer {
  margin-left: 1rem;
  color: white;
  font-family: 'Flaco';
  font-size: .75rem;
}

.spinner {
  // display: none;
  background: conic-gradient(#C4C4C4, rgba(0,0,0,0));
  height: 1rem;
  width: 1rem;

  border-radius: 100%;
  animation:spin 4s linear infinite;
}

.spinner__insert {
  margin-left: .2rem;
  margin-top: .2rem;
  position: absolute;
  height: 0.6rem;
  width: .6rem;
  background: #1d1d1d;
  border-radius: 100%;
}

@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>