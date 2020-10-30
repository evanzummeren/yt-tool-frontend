<template>
  <div class="containerChannels flexcontainer">

    <div class="container__left">
      <h2>Visualisation</h2>
      <h1>{{query}}</h1>
      <span class="h1__underheading">{{amountResults}} mentions</span>
      <br/><br/>
      <span class="h1__underheading">[Important] These graphs currently show the results for all categories.</span>
    </div>


    <div class="container__right">
      <div class="graphcontainers firstgraph">
        <h4>Active vs removed</h4>
        <canvas id="removed" ref="removed"></canvas>
      </div>
      <div class="graphcontainers secondgraph">
        <h4>Entries per community</h4>
        <canvas id="catpie" ref="catpie"></canvas>
      </div>
      <div class="graphcontainers thirdgraph">
        <h4>Channels with most entries</h4>
        <span class="comingsoon">Coming soon</span>
      </div>
      <div class="graphcontainers fourthgraph">
        <h4>N-gram over months</h4>
        <canvas id="ngram" ref="ngram"></canvas>
      </div>
    </div>


  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: "datavis",
  props: ['aggs', 'query', 'amountResults'],
  data: function() {
    return {
      highestNumber: 0,
      ngramArray: []
    }
  },
  beforeUpdate: function() {
    this.highestNumber = this.aggs.channels.buckets[0].doc_count;
  },
  watch: {
    aggs: function () {
      this.triggerDatavis();
    }
  },
  methods: {
    triggerDatavis() {
      // console.log(this.aggs)
      this.generatePieData(this.aggs.removed);
      this.generateCommunityData(this.aggs.categories.buckets);
      this.generateNgramData(this.aggs.mentions_over_time.buckets);
    },
    epochToDate(int) {
      let newD = new Date(int);
      return `${newD.getMonth() + 1} – ${newD.getFullYear()}`
    },
    generatePieData: function(incoming) {
      let data = {
        labels: ['Active', 'Removed'],
        datasets: [{
          label: '# of Votes',
            data: [incoming.buckets[0].doc_count, incoming.buckets[1].doc_count],
            backgroundColor: [
              'rgba(196, 196, 196, 0.8)',
              'rgba(83, 83, 83, 0.8)',
            ],
            borderColor: [
              'rgba(196, 196, 196, 1)',
              'rgba(83, 83, 83, 1)',
            ],
            borderWidth: 1,
            hoverOffset: 4
          }]
        };
      
      this.createPie(data);
    },
    generateCommunityData: function(incoming) {
      let mappedLabels = [];
      let numbers = [];

      incoming.map((item)=> {
        numbers.push(item.doc_count);
        mappedLabels.push(item.key);
      })

      let data = {
        labels: mappedLabels,
        datasets: [{
          label: '# of Votes',
            data: numbers,
            backgroundColor: [
              'rgba(196, 196, 196, 0.8)',
              'rgba(176, 176, 176, 0.8)',
              'rgba(136, 136, 136, 0.8)',
              'rgba(116, 116, 116, 0.8)',
              'rgba(96, 96, 96, 0.8)',
              'rgba(76, 76, 76, 0.8)',
              'rgba(46, 46, 46, 0.8)'
            ],
            borderColor: [
              'rgba(196, 196, 196, 1)',
              'rgba(176, 176, 176, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(116, 116, 116, 1)',
              'rgba(96, 96, 96, 1)',
              'rgba(76, 76, 76, 1)',
              'rgba(46, 46, 46, 1)',
            ],
            borderWidth: 1,
            hoverOffset: 4
          }]
        };
      
      this.createCatPie(data);
    },
    generateNgramData: function(incoming) {
      let mappedDates = [];
      let numbers = [];

      incoming.map((item)=> {
        numbers.push(item.doc_count);
        this.ngramArray.push(item.key);
        mappedDates.push(this.epochToDate(item.key));
      })

      let data = {
        labels: mappedDates,
        datasets: [{
            data: numbers,
            backgroundColor: 'white',
            borderWidth: 1,
            hoverOffset: 4
          }]
        };
      
      this.createNGram(data);
    },
    graphClickEvent: function(event, elem){
      console.log(event);
      if (elem.length >= 1) {
        this.$parent.switchView('text');
        this.$router.push(`../../../../../../../../../../search/q/${this.query}/cat/qanon,altright,althealth,breadtube,conspiracy,marxism/sort/asc/gte/${this.ngramArray[elem[0]._index]/1000}/lte/1698371302`)
        this.$router.go() // Refactor
      }
    },
    createNGram: function(data) {
      let options = {
          legend: {
            display: false
          },
          onClick: this.graphClickEvent,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              gridLines: {
                color: '#505050',
                borderDash: [1,2]
              },
              ticks: {
                maxTicksLimit: 8
                // fontsize: 30,
              },
              stacked: true
            }],
            xAxes: [{
              ticks: {
                maxTicksLimit: 40
              }
            }]
            

            
          }
        };

      new Chart(this.$refs.ngram, {
        type: 'bar',
        data: data,
        options: options
      });
    },
    createPie: function(data) {
      let chart = new Chart(this.$refs.removed, {
        type: 'pie',
        data: data,
        options: {
          legend: {
            display: false
          }
        }
      });

      console.log(chart);
    },
    createCatPie: function(data) {
      let chart = new Chart(this.$refs.catpie, {
        type: 'pie',
        data: data,
        options: {
          legend: {
            display: false
          }
        }
      });

      console.log(chart);
    }
  }
}
</script>

<style lang="scss" scoped>
.containerChannels {
  z-index: 1;
  width: calc(100vw - 81px);
  position: absolute;
  top: 2rem;
}

.flexcontainer {
  display: flex;
  min-height: calc(100% - 4rem);
}

.container__left {
  width: 20%;
  background: black;
  border-right: 1px solid white;
  padding: 6rem 2rem 0 2rem;
  min-height: calc(100vh - 4rem);
}

.container__right {
  width: 80%;
  min-height: calc(100vh - 4rem);
  background: black;
  border-right: 1px solid #8A8A8A;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.graphcontainers {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 50%;

}

.firstgraph {
  width: 25%;
  border-right: 1px solid #5F5F5F;
}

.secondgraph {
  width: 25%;
  height: 50%;
  border-right: 1px solid #5F5F5F;
}

.thirdgraph {
  width: 50%;
  height: 50%;
}

.fourthgraph {
  width: 100%;
  height: 50%;
  border-top: 1px solid #5F5F5F;
}

h4 {
  // margin: 2.7rem 1.5rem;
  font-family: 'Flaco';
  font-size: .75rem;
  font-weight: 100;
  color: white;
  text-transform: uppercase;
  background: black;
  display: inline-block;
  padding: .3rem .5rem;
  position: absolute;
  left: 1.5rem;
  top: 1.2rem;
}

h2, .h1__underheading {
  font-family: 'Flaco';
  font-size: .8rem;
  font-weight: 100;
  color: white;
  text-transform: uppercase;
}

.h1__underheading {
  color: #9E9E9E;
}

h1 {
  font-family: 'Gil';
  font-size: 2.5rem;
  font-weight: 100;
  color: white;
  margin-bottom: .3rem;
}

.comingsoon {
  color: #757575;
  font-family: 'Flaco';
  text-transform: uppercase;
  border: 1px solid #1b1b1b;
  padding: 8px 12px 6px;
}

</style>