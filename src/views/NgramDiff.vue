<template>
  <div class="one__thirdcontainer flexcontainer">
    <Linework />

    <div class="container__left">
      <h2>Ngram diff</h2>
      <br/>

      <form
        id="app"
        @submit="generateNgrams">

      <input 
      class="searchinput"
      v-model="keyword" 
      placeholder="keyword">
      <br/><br/>

      <span class="h1__underheading">first date</span>
      <DatePicker 
        v-model='dates.selectedFirstDate' 
        :value="null"
        color="purple"
        is-dark />

      <br/><br/>
      <span class="h1__underheading">second date</span>
      <DatePicker 
        v-model='dates.selectedSecondDate' 
        :value="null"
        color="purple"
        is-dark />
        <br/><br/>

      <span class="h1__underheading">days before & after</span>
       <VueSimpleRangeSlider
          :min="1"
          :max="10"
          v-model="dates.number" />

      <br/><br/>

      <span class="h1__underheading">channels</span>
      <ul>
        <li 
          v-for="name in names" 
          @click="removeChannel(name)"
          :key="name">
          {{name}}
        </li>
      </ul>


      <vue-simple-suggest
        v-model="chosen"
        :list="simpleSuggestionList"
        display-attribute="name"
        :max-suggestions="7"
        @select="selected"
        :filter-by-query="true">
      </vue-simple-suggest>

    <button>Generate</button>

    </form>

    <ul>
      <li 
        v-for="error in errors"
        class="error" 
        :key="error">
      {{error}}
      </li>
    </ul>


    </div>

    <div class="container__right">

      <div class="graphcontainers firstgraph">
        <canvas id="graph_one" ref="graph_one"></canvas>
        <!-- <div class="csv">.csv</div> -->
      </div>

      <div class="graphcontainers secondgraph">
        <canvas id="graph_two" ref="graph_two"></canvas>
        <!-- <div class="csv">.csv</div> -->
      </div>


    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import Linework from '../components/Visuals/Linework.vue';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import VueSimpleSuggest from 'vue-simple-suggest'
import VueSimpleRangeSlider from 'vue-simple-range-slider';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import serverCredentials from '../mixins/server.json';

import 'vue-simple-range-slider/dist/vueSimpleRangeSlider.css';
import 'vue-simple-suggest/dist/styles.css';

export default {
  name: "Ngramdiff",
  components: {
    Linework, DatePicker, VueSimpleRangeSlider, VueSimpleSuggest
  },
  data: function() {
    return {
      dates: {
        selectedFirstDate: new Date(2016, 10, 8),
        selectedSecondDate: new Date(2020, 9, 14),
        number: 5
      },
      firstChart: {},
      secondChart: {},
      // keyword: null,
      keyword: 'trump',
      errors: [],
      names: ['Ben Shapiro', 'StevenCrowder', 'SJWCentral'],
      colorCodes: ['#7D4090', '#282970', '#C4C4C4', '#4633F5', '#535353', '#7C8BE4', '#CABBF6', '#222A48', '#2A476F'],
      chosen: '',
      list: {},
      graph: {
        labelsFirst: [],
        labelsSeconds: [],
        datasetsFirst: [],
        datasetsSecond: []
      }

    }
  },
  mounted: function() {
    this.$parent.noFooterMenu();
    
    let _this = this;
      axios.get(`https://zummie.com/yt888/items/channel?filter[category][%3C]=9&fields=id,name`)
      .then(function (response) {
        console.log(response.data);
        _this.list = response.data;
      })
      .catch( function (error) {
        console.log(error);
      });
  },
  methods: {
    simpleSuggestionList() {
      return this.list.data
    },
    selected() {
      window.setTimeout(()=>{
        if (!_.includes(this.names, this.chosen)) {
          this.names.push(this.chosen)
        }
      },100)
    },
    removeChannel(name) {
      console.log(_.pull(this.names, name))
      let newNames = _.pull(this.names, name);
      this.names = [];
      newNames.map((name) => {
        this.names.push(name)
      })
    },
    epochToDate(int) {
      return moment.unix(int).format("MM/DD/YY")
    },
    epochConvert(dateObj) {
      return Math.round(dateObj.getTime() / 1000)
    },
    generateLabels(incomingDate, timeArray) {
      var start = moment(incomingDate)
      var utcStart = moment(start).utc().add(start.utcOffset(), 'm').toISOString()
      let unix = Date.parse(utcStart);

      let firstTimestamp = (unix/1000) - (86400 * (this.dates.number));

      for (var i = 0; i < (this.dates.number * 2); i++) {
        timeArray.push(this.epochToDate(firstTimestamp + (86400 * i)))
      }
    },
    generateNgrams(e) {
      this.errors = [];

      if (!this.keyword) {
        this.errors.push('> Fill in a keyword');
      }
      if (this.names.length === 0) {
        this.errors.push('> Select channel(s)');
      }

      this.createNGram();
      e.preventDefault();
    },
    prepareCall(channel, incomingDate, graph) {
      let query = {
        "size": 20,
        "from": 0,
        "query": {
          "bool": {
            "must": [ {
              "query_string": {
                "query": `${this.keyword} user: "${channel}"`,
                "default_field": "line",
                "default_operator": "AND"
                }
              }, { 
                "range" : {
                  "date" : {
                    "gte" : this.epochConvert(incomingDate) - (86400 * (this.dates.number)),
                    "lte" : this.epochConvert(incomingDate) + (86400 * (this.dates.number))
                  }
                }
              }
            ]
          }
        },
        "aggs": {
          "mentions_over_time": {
            "date_histogram": {
              "field": "date",
              "interval": "1d"
            }
          }
        }
      }

      this.processCall(query, graph)
    },
    processCall(query, type) {
      var _this = this;

      axios.post(serverCredentials.url, query)
      .then(function (response) {

        if (type === 'first') {
          console.log(response.data.aggregations.mentions_over_time);
          console.log(response.data.hits.hits[0]._source.user);

          console.log(_this.firstChart.data.labels)

          let restructuredData = _this.constructDatapoints(response.data, _this.firstChart.data.labels);
          console.log(restructuredData);

          _this.firstChart.data.datasets.push(restructuredData);
          _this.firstChart.update(); 
        } else if (type === 'second') {
          let restructuredData = _this.constructDatapoints(response.data, _this.secondChart.data.labels);
          // _this.secondChart.data.datasets.push(restructuredData) //fix

          _this.graph.datasetsSecond.push(restructuredData) // fix
        }
      })
      .catch( function (error) {
        console.log(error);
        // _this.resultsMetadata.errorMessage = "Invalid request";
        // _this.resultsMetadata.noResults = true;
      });
    },
    constructDatapoints: function(incomingData, labels) {
      let dataPoints = [];

      for (var i = 0; i < labels.length; i++) {
        let hit = false;

        for (var n = 0; n < incomingData.aggregations.mentions_over_time.buckets.length; n++) {
          if (labels[i] === (this.epochToDate(incomingData.aggregations.mentions_over_time.buckets[n].key/1000))) { // includes
            dataPoints.push(incomingData.aggregations.mentions_over_time.buckets[n].doc_count)
            hit = true;
          }
        }

        if (hit === false) {
          dataPoints.push(0);
        }
      }

      let indexN = _.indexOf(this.names, incomingData.hits.hits[0]._source.user)

      let obj = {
        label: incomingData.hits.hits[0]._source.user,
        backgroundColor: this.colorCodes[indexN],
        data: dataPoints
      }

      return obj;
    },
    generateNgramData: function() {

      // let data = {
      //   labels: this.graph.labelsFirst,
      //   datasets: [{
      //       data: this.graph.datasetsFirst,
      //       backgroundColor: 'white',
      //       borderWidth: 1,
      //       hoverOffset: 4
      //     }]
      //   };
      
    },
    graphClickEvent: function(event, elem){
      if (elem.length >= 1) {
        this.$parent.switchView('text');
        this.$router.push(`../../../../../../../../../../search/q/${this.query}/cat/qanon,altright,althealth,breadtube,conspiracy,marxism/sort/asc/gte/${this.ngramArray[elem[0]._index]/1000}/lte/1698371302`)
        this.$router.go() // Refactor
      }
    },
    createNGram: function() {
      let options = {
          legend: {
            display: false
          },
          onClick: this.graphClickEvent,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              gridLines: {
                zeroLineWidth: 1,
                zeroLineColor: '#5F5F5F',
                color: '#505050',
                borderDash: [1,2]
              },
              ticks: {
                maxTicksLimit: 16,
                fontFamily: 'Flaco'
                // fontsize: 30,
              },
              stacked: true
            }],
            xAxes: [{
              stacked: true,
              ticks: {
                fontFamily: 'Flaco',
                maxTicksLimit: 40,
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90,
              }
            }]
            

            
          }
        };

      this.firstChart = new Chart(this.$refs.graph_one, {
        type: 'bar',
        data: {
          labels: [],
          datasets: []
        },
        options: options
      });

      console.log(this.firstChart)

      this.generateLabels(this.dates.selectedFirstDate, this.firstChart.data.labels);
      this.generateLabels(this.dates.selectedSecondDate, this.graph.labelsSeconds);
      this.firstChart.update(); 

      if (this.keyword && this.names.length >= 1) {
        for (var i = 0; i < this.names.length; i++) {
          this.prepareCall(this.names[i], this.dates.selectedFirstDate, 'first')
          this.prepareCall(this.names[i], this.dates.selectedSecondDate, 'second')
        }
      }
    }
  
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/datavis';
@import '../styles/searchbar';

input {
  width: 100% !important;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  color: white;
  padding: 0;
  font-family: 'Flaco';
  border-bottom: 1px dotted white;
  white-space: nowrap;
  font-size: .8rem;
  padding: .5rem .3rem;
  cursor: pointer;
}

.error {
  border-bottom: none;
  cursor: inherit;
}

.error:hover {
  background: none
}

li:first-child {
  margin-top: 1rem;
}

li:hover {
  background: #333;
}

button {
  margin-top: 1rem;
  width: 100%;
  background: #4f23ff;
  color: white;
  font-family: 'Flaco';
  line-height: 2rem;
  text-transform: uppercase;
  border: none;
  outline: none;
  cursor: pointer;
}

button:hover {
  background: #6038ff
}

.graphcontainers {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 75%;
}

.firstgraph {
  width: 50%;
  border-right: 1px solid #5F5F5F;
  border-bottom: 1px solid #5F5F5F;
}

.secondgraph {
  width: 50%;
  border-bottom: 1px solid #5F5F5F;
}

.container__right {
  margin-top: 2rem;
}

#graph_one {
  padding-top: 10px;
  padding-bottom: 10px;
}

</style>