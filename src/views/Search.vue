<template>
  <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScroll.busy" infinite-scroll-distance="10">
    <Ngram v-if="view === 'text'" />

    <SearchMenu 
      v-if="showSearchMenu"
      :checkedCategories="searchOptions.categories"
      :incomingSort="searchOptions.sort"
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
    </header>

    <NoResults 
      :text="resultsMetadata.errorMessage"
      v-if="resultsMetadata.noResults" />

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
        {{this.resultsMetadata.results}} results, showing {{this.resultsMetadata.currentlyShowing}}
      </div>
    </div>

  </div>
</template>

<script>
import Result from '../components/Result.vue';
import NoResults from '../components/NoResults.vue';
import SearchMenu from '../components/SearchMenu.vue';

import Embed from '../components/Embed.vue'
import Ngram from '../components/Ngram.vue'
import Datavis from '../components/Datavis.vue'
const axios = require('axios');

import {bus} from '../main.js'

import serverCredentials from '../mixins/server.json';

export default {
  name: 'Home',
  components: {
    Result, SearchMenu, Embed, Datavis, Ngram, NoResults
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
        size: 20,
        pos: 0
      },
      resultsMetadata: {
        errorMessage: "",
        noResults: false,
        results: 0,
        currentlyShowing: 0
      },
      results: [],
      aggsResults: {}
    }
  },
  mounted: function() {
    this.keyword = this.$route.params.query;
    this.searchOptions.categories = this.$route.params.categories.split(",");
    this.searchOptions.sort = this.$route.params.sort;
    this.formQuery(this.$route.params.query, this.searchOptions.categories, false);

    bus.$emit('switchActiveMenu', 'search')

    bus.$on('triggerSwitch', this.switchView)
  },
  methods: {
    switchView: function(type) {
      this.view = type;

      if (type === 'datavis') {
        this.formQuery(this.$route.params.query, this.searchOptions.categories, true);
      }

      // console.log(type)
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
      this.searchOptions.sort = type },
    performSearch() {
      this.results = [];
      this.infiniteScroll.pos = 0;
      this.formQuery(this.keyword, this.searchOptions.categories, false);
      this.showSearchMenu = false;
      this.$router.push(`../../../../../../search/q/${this.keyword}/cat/${this.stitchCategories()}/sort/${this.searchOptions.sort}`)
    },
    stitchCategories() {
      let str = this.searchOptions.categories.join(",");
      return str;
    },
    formQuery(str, cat, agg) {
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
                "default_field": "line",
                "default_operator": "AND"
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

        if ( agg === false ) { // If there is no data aggregation
          _this.resultsMetadata.results = response.data.hits.total;

          response.data.hits.hits.forEach( el => {
            _this.results.push( el )
          });

          _this.calculateAmountResults();
        } else if ( agg === true ) { // User clicked on datavis
          _this.aggsResults = response.data.aggregations;
        }

      })
      .catch( function (error) {
        console.log(error);
        _this.resultsMetadata.errorMessage = "Invalid request";
        _this.resultsMetadata.noResults = true;
      });
    },
    calculateAmountResults() {
      console.log('calculating');
      let meta = this.resultsMetadata;

      console.log(meta)

      if ( meta.results === 0 ) {
        this.resultsMetadata.errorMessage = "No results";
        this.resultsMetadata.noResults = true;
      } else {
        this.resultsMetadata.noResults = false;
      }

      if ( meta.results < this.infiniteScroll.size) {
        meta.currentlyShowing = this.resultsMetadata.results;
      } else {
        meta.currentlyShowing = meta.currentlyShowing + this.infiniteScroll.size;
      }
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