<template>
  <div class="containerChannels flexcontainer">

    <div class="container__left">
      <h2>Visualisation</h2>
      <h1>{{query}}</h1>
      <span class="h1__underheading">333 channels</span>

    </div>

    <div class="datavis__container">











      <div class="info">
        <h3>Channel frequency</h3>
        <p v-for="(result, index) in aggs.categories.buckets"
          v-bind:key="index"
          class="tempstyling"
        >{{result.key}} – {{result.doc_count}} mentions</p>

        <h3>Online</h3>
        <p v-for="(result, index) in aggs.removed.buckets"
          v-bind:key="index"
          class="tempstyling"
        >{{result.key_as_string}} – {{result.doc_count}}</p>
      </div>
      <div class="graph">
        <div class="graph__container">
          <div 
            v-for="(result, index) in aggs.channels.buckets" 
            class="bar"
            v-bind:key="index"
            v-bind:style="{height: setOrdinalScale(result.doc_count) + 'px'}">
              <span class="inner">{{result.key}}-{{result.doc_count}}</span>
            </div>
          
           <!-- <li v-for="(result, index) in results" v-bind:key="index"> -->

        </div>

        <!-- <p>{{aggs.channels.buckets}}</p> -->
      </div>
    </div>

  </div>
</template>

<script>
import linearScale from 'simple-linear-scale';

export default {
  name: "datavis",
  props: ['aggs', 'query'],
  data: function() {
    return {
      highestNumber: 0
    }
  },
  beforeUpdate: function() {
    this.highestNumber = this.aggs.channels.buckets[0].doc_count;
  },
  mounted: function() {

    // highestNumber

    console.log('mouting data')
    console.log(this.aggs);
  },
  methods: {
    setOrdinalScale: function(int) {
      let scaleFunction = linearScale([0, this.highestNumber], [0, 175]);
      return scaleFunction(int); 
    }
  }
}
</script>

<style lang="scss" scoped>
.containerChannels {
  z-index: 100;
  width: calc(100vw - 5rem);
  top: 2rem;
}

.flexcontainer {
  display: flex;
  min-height: calc(100vh - 3rem);
}

.container__left {
  width: 20%;
  background: black;
  border-right: 1px solid white;
  padding: 6rem 2rem 0 2rem;
  position: fixed;
  min-height: calc(100vh - 2rem);
}




.datavis__container {
  display: flex;
}

.info {
  width: 20%;
  padding: 3rem 1rem 3rem 3rem;
}

.graph {
  width: 80%;
  padding: 3rem;
}

.graph__container {
  margin-top: 4rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-end;
  flex-shrink: 0;
  // overflow-x: scroll;

}

h3 {
  font-family: "Gil";
  font-weight: 100;
  font-size: 1.4rem;
  color: white;
}

.bar {
  background: #8A8A8A;
  min-width: 10px;
  margin-left: 12px;
  position: relative;
}

.inner {
  display: block;
  position: absolute;
  margin-left: 1rem;
  font-family: 'Flaco';
  font-size: .6rem;
  color: white;
  width: 11rem;
  opacity: .1;
}

.tempstyling {
  color: white;
    font-family: 'Flaco';
  font-size: 1rem;
}









.container__left {
  width: 20%;
  background: black;
  border-right: 1px solid white;
  padding: 6rem 2rem 0 2rem;
  position: fixed;
  min-height: calc(100vh - 2rem);
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

</style>