<template>
  <div class="searchmenu">
    <div class="container__searchmenu">
      <div class="search searchmenu__space">
        <h3>search operators</h3>
        <ul>
          <li>"biblical times"</li>
          <li>"5g networks"~3</li>
          <li>d*gs – wildcard</li>
          <li>epstein user: "Angelo John Gage"</li>
        </ul>
      </div>
      <div class="categories searchmenu__space">
        <h3>categories</h3>
        <div class="checkboxes">
          <h4>political</h4>
          <input type="checkbox" id="altright" value="altright" v-model="checkedCats" @change="changeCategories"><label for="altright">alt-right (right)</label><br/>
          <input type="checkbox" id="qanon" value="qanon" v-model="checkedCats" @change="changeCategories"><label for="qanon">qanon (right)</label><br/>
          <input type="checkbox" id="breadtube" value="breadtube" v-model="checkedCats" @change="changeCategories"><label for="breadtube">breadtube (left)</label><br/>
          <input type="checkbox" id="marxism" value="marxism" v-model="checkedCats" @change="changeCategories"><label for="marxism">marxism (left)</label><br/><br/><br/>

          <h4>other categories</h4>
          <input type="checkbox" id="althealth" value="althealth" v-model="checkedCats" @change="changeCategories"><label for="althealth">alternative health</label><br/>
          <input type="checkbox" id="conspiracy" value="conspiracy" v-model="checkedCats" @change="changeCategories"><label for="conspiracy">conspiracy</label><br/>
          <input type="checkbox" id="nlconspiracy" value="nlconspiracy" v-model="checkedCats" @change="changeCategories"><label for="nlconspiracy">dutch conspiracy</label><br/>
          <input type="checkbox" id="spirituality" value="spirituality" v-model="checkedCats" @change="changeCategories"><label for="nlconspiracy">dutch conspiracy</label><br/>

        </div>

      </div>
      <div class="sort searchmenu__space">
        <h3>sort</h3>
        <ul class="sortcontainer">
          <li v-bind:class="{ on: sort === 'desc' }" @click="selectSort('desc')">newest</li>
          <li v-bind:class="{ on: sort === 'asc' }" @click="selectSort('asc')">oldest</li>
          <!-- <li v-bind:class="{ on: sort === 'mostpopular' }" @click="selectSort('mostpopular')">most popular</li> -->
          <!-- <li v-bind:class="{ on: sort === 'mostrelevant' }" @click="selectSort('mostrelevant')">most relevant</li> -->
        </ul>
      </div>
      <div class="filter searchmenu__space">
        <h3>filters</h3>
        <ul class="filters">
          <li>start date</li>
            <DatePicker 
                v-model='dates.selectedFirstDate' 
                :value="null"
                color="purple"
                is-dark />

          <li>end date</li>
            <DatePicker 
                v-model='dates.selectedSecondDate' 
                :value="null"
                color="purple"
                is-dark />
          <br/>
          <li>show removed videos</li>
          <div class="checkboxes">
            <input type="checkbox" id="true" value="true" v-model="checkedOnline" @change="changeOnline"><label for="true">available videos</label><br/>
            <input type="checkbox" id="false" value="false" v-model="checkedOnline" @change="changeOnline"><label for="false">removed videos</label>
          </div>

        </ul>
      </div>
    </div>

        <div class="window">
          <div
            class="window__bar"
            :ref="'single_' + index"
            v-for="index in 120" 
            :key="index">
          <div class="window__barwhitefill"></div>

        </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import anime from 'animejs/lib/anime.es.js';
import DatePicker from 'v-calendar/lib/components/date-picker.umd'


export default {
  name: "SearchMenu",
  components: {
    DatePicker
  },
  props: ['checkedCategories', 'checkedOnlineOffline', 'incomingSort', 'firstDate', 'secondDate'],
  data: function() {
    return {
      sort: this.incomingSort,
      dates: {
        selectedFirstDate: this.firstDate,
        selectedSecondDate: this.secondDate
      },
      checkedCats: [],
      checkedOnline: []
    }
  },
  mounted: function() {
    this.checkedCats = this.checkedCategories;
    this.checkedOnline = this.checkedOnlineOffline;
    anime({
      targets: '.window__bar',
      height: function() { return 500 + anime.random(0, 100); },
      duration: 2000,
      delay: function(el, i) { return i * 7; },
    });

    anime({
      targets: '.searchmenu__space',
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeInOutExpo',
      transformX: [-10, 0],
      delay: 1000,
    })

    this.animatePianoKeys(); 
  },
  watch: {
    'dates.selectedFirstDate': function(newVal){
      this.$parent.passDates(newVal, 'first');
    },
    'dates.selectedSecondDate': function(newVal){
      this.$parent.passDates(newVal, 'second');
    }
  },
  methods: {
    changeCategories: function() {
      this.$parent.passCategories(this.checkedCats);
    },
    changeOnline: function() {
      this.$parent.passOnline(this.checkedOnline);
    },
    selectSort: function(sortType) {
      this.sort = sortType;
      this.$parent.passSort(sortType)
    },
    animatePianoKeys() {
      anime({
        targets: '.window__barwhitefill',
        height: function(el, i) { 
          var a = i / 180 * Math.PI;
          var x = Math.cos(a);
          var y = Math.sin(a);
          var d = Math.sqrt((1-x) ** 2 + y**2);

          return d * 20 
        },
        opacity: function(el, i) {
          var n = anime.random(-2, 1);
          if (n < 0) {
            return 0
          } else {
            return 1
          }
        },
        duration: 3000,
        delay: function(el, i) { return i * 7; },
        ease: 'easeInOutQuad'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.on {
  color: white;
  cursor: default;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  // cursor: pointer;
}

.sortcontainer li {
  cursor: pointer;
}

li, .subheading {
  font-family: 'Flaco';
  font-size: 1rem;
  margin-top: .3rem;
  color: #B2B2B2;
  font-weight: 100;
}

.subheading {
  margin-top: 1rem;
}

.checkboxes {
  margin-top: 36px;
}


input[type=checkbox] + label {
  display: block;
  cursor: pointer;
}

input[type=checkbox] {
  display: none;
}

input[type=checkbox] + label:before {
  content: "\2714";
  font-size: 10px;
  border: 0.1em solid white;
  display: inline-block;
  width: 10px;
  height: 10px;
  // padding-left: 0.2em;
  // padding-bottom: 1em;
  padding: 2px;
  margin-right: 12px;
  vertical-align: bottom;
  color: transparent;
}

input[type=checkbox]:checked + label:before {
  background-color: white;
  border-color: white;
  color: #fff;
}

label {
  margin-left: .3rem;
  font-family: 'Flaco';
  font-size: 1rem;
  margin-top: -.9rem;
  color: #B2B2B2;
}

input:checked + label {
  color: white;
}

.searchmenu {
  width: 100vw;
  height: 500px;
  z-index: 50;
  // background: black;
  position: fixed;
  margin-left: -2rem;
  margin-top: -2rem;
  padding: 4rem 2rem;
}

.searchmenu__space {
  opacity: 0;
  padding: 1.5rem 1rem;
}

h3 {
  color: white;
  font-family: 'Gil';
  font-weight: 100;
  font-size: 1.25rem;
}

.container__searchmenu {
  height: 500px;
  display: flex;
}

.search {
  width: 24rem;
  height: 500px;
}

.categories {
  width: 15rem;
  height: 500px;
}

.sort {
  width: 15rem;
  height: 500px;
}

.filter {
  width: 15rem;
  height: 500px;
}

.window {
  width: 100vw;
  height: 500px;
  padding-left: 1rem;
  display: flex;
  position: absolute;
  top: 0;
  z-index: -10;
  left: 1rem;
}

.window__bar {
  width: 1rem;
  height: 0%;
  background: #1D1D1D;
  display: flex;
}

.window__barwhitefill {
  background: white;
  width: 100%;
  height: 0;
  align-self: flex-end;
}

.filters li {
  margin-top: 4px;
}

h4 {
  color: #a6a6a6;
  font-family: 'Flaco';
  font-weight: 100;
  margin-top: -18px;
  font-size: 16px;
}
</style>