<template>
  <div id="app">
    <Header/>
    <Sidemenu 
      v-if="sidemenu" 
      @switch="switchActive"
      @close="closeSidemenu" />

      <div class="verticalline--top"></div>
      <div class="verticalline--header"></div>
      <div class="menu" v-on:click="closeSidemenu(true)">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.0762 1.84757H0.923788C0.406467 1.84757 0 1.44111 0 0.923787C0 0.406467 0.406467 0 0.923788 0H15.0762C15.5935 0 16 0.406467 16 0.923787C16 1.44111 15.5935 1.84757 15.0762 1.84757Z" fill="white"/>
          <path d="M15.0762 5.54289H0.923788C0.406467 5.54289 0 5.13642 0 4.6191C0 4.10178 0.406467 3.69531 0.923788 3.69531H15.0762C15.5935 3.69531 16 4.10178 16 4.6191C16 5.13642 15.5935 5.54289 15.0762 5.54289Z" fill="white"/>
          <path d="M15.0762 9.23771H0.923788C0.406467 9.23771 0 8.83125 0 8.31392C0 7.7966 0.406467 7.39014 0.923788 7.39014H15.0762C15.5935 7.39014 16 7.7966 16 8.31392C16 8.83125 15.5935 9.23771 15.0762 9.23771Z" fill="white"/>
        </svg>
      </div>

    <router-view />

    <div v-if="showFooterMenu" class="footer__menu" v-bind:class="{ 'footer__menu--bgon': menushowbg }">
      <ul class="sidenav">
        <router-link to="/search/q/epstein/cat/qanon,altright,althealth,breadtube,conspiracy,marxism/sort/desc">
          <li v-bind:class="{ 'diamond--active': currentActive === 'search', 'diamond': true }" 
              @click="switchActive('search')">Video search</li>
        </router-link>
          <li v-bind:class="{ inset: !text, 'inset--active': text }" v-if="currentActive === 'search'" @click="triggerText()">Text</li>
          <li v-bind:class="{ inset: !vis, 'inset--active': vis }" v-if="currentActive === 'search'" @click="triggerVis()">Visualisation</li>
        <li class="diamond tooltip" @click="switchActive('comments')">Comments<span class="tooltiptext">Coming soon</span></li>
        <li class="diamond tooltip">Notifications<span class="tooltiptext">Coming soon</span></li>
      </ul>
    </div>

  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import Header from './components/Header.vue';
import Sidemenu from './components/Sidemenu.vue';
import { bus } from './main.js'

export default {
  name: 'App',
  components: {Header, Sidemenu},
  data: function() {
    return {
      currentActive: "",
      text: true,
      vis: false,
      insetActive: "text",
      sidemenu: false,
      menushowbg: false,
      showFooterMenu: true
    }
  },
  mounted: function() {
    bus.$on('switchActiveMenu', (data) => {
      // console.log(data)
    })

    this.defineBg();
  },
  updated: function() {
    this.defineBg();
  },
  methods: {
    noFooterMenu: function() { this.showFooterMenu = false },
    defineBg: function() {
      if ( this.$route.name === "Search") {
        this.menushowbg = true;
      } else {
        this.menushowbg = false;
      }      
    },
    triggerText: function() {
      // Needs refactoring
      this.text = true;
      this.vis = false;
      bus.$emit('triggerSwitch', 'text')
    },
    triggerVis: function() {
      // Needs refactoring
      this.text = false;
      this.vis = true;
      bus.$emit('triggerSwitch', 'datavis')
    },
    switchActive: function (str) {
      this.currentActive = str;
    },
    closeSidemenu: function (val) {
      this.sidemenu = val;
    },
  }
}
</script>

<style lang="scss">
@import './styles/mediaqueries';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

a {
  text-decoration: none;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  background: #1D1D1D;
  z-index: 100;
  width: calc(100vw - 5rem);
  position: absolute;
  left: 2rem;
  top: 2rem;
  // min-height: 100vh;
  border-left: 1px solid #4F23FF;
  border-right: 1px solid #8A8A8A;
}

@font-face {
  font-family: "Flaco";
  src: url("./assets/fonts/fl-mono.woff") format("woff");
}

@font-face {
  font-family: "Flaco-Reg";
  src: url("./assets/fonts/fl-reg.woff") format("woff");
}


@font-face {
  font-family: "Gil";
  src: url("./assets/fonts/gil-reg.woff") format("woff");
}

body {
  font-size: 16px;
  background: black;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.hit {
  color: #D3C8FF;
  display: inline;
  padding: 0 .5rem;
  background: linear-gradient(180deg, rgba(29,29,29,0) 45%, rgba(79,35,255,1) 45%, rgba(79,35,255,1) 70%, rgba(29,29,29,0) 70%);
}

.footer {
  position: fixed;
  width: 200px;
  height: 2rem;
  bottom: 0;
  left: 0;
  background: blue;
  z-index: 100;
}

/* Date picker */
.vc-border-gray-700 {
  border-color: #4f23ff !important;
}

.vc-bg-gray-900 {
  background-color: #B2B2B2 !important;
}

.vc-text-gray-200 {
  color:black !important;
  font-family: 'Flaco' !important;
}

.vc-text-gray-100 {
  color: black !important;
  font-family: 'Flaco' !important;
}

.vc-appearance-none {
  background: none !important;
  border: none  !important;
  border-bottom: 1px dotted white !important;
  color: white !important;
  font-family: 'Flaco' !important;
  font-size: .8rem  !important;
  border-radius: 0 !important;
  margin-top: 5px;
  margin-bottom: 10px;
}

/* Sprite */
#sprite {
  width: 100%;
  top: 0;
  position: absolute;
  left: 0;
}

.footer__menu {
  position: fixed;
  left: calc(2rem + 1px);
  bottom: calc(2rem + 1px);
  height: 240px;
  width: 200px;
  z-index: 1000;
}

.footer__menu--bgon {
  background: linear-gradient(192deg, rgba(29,29,29,0) 0%, rgba(29,29,29,1) 81%, rgba(29,29,29,1) 100%);
}

.sidenav {
  list-style-type: none;
  padding-left: 0px;
  margin-left: -8px;
  margin-top: 80px;
}

.diamond {
  background-image: url("./assets/icons/diamond.svg");
  background-repeat: no-repeat;
  background-size: 1rem;
  line-height: 1rem;
  padding-left: 2rem;
  margin-bottom: .5rem;
  font-family: 'Flaco';
  color: #9E9E9E;
  text-decoration: none;
    &--active {
    @extend .diamond;
    background-image: url("./assets/icons/diamond_active.svg");
    color: white;
  } 
}

.inset {
  font-size: .9rem;
  line-height: 1rem;
  padding-left: 3rem;
  margin-bottom: .5rem;
  font-family: 'Flaco';
  cursor: pointer;
  color: #9E9E9E;
  text-decoration: none;
    &--active {
      @extend .inset;
      color: white !important;
    }
}

.verticalline--top {
  width: 1px;
  height: 2rem;
  background: #474747;
  position: fixed;
  right: 3rem;
}

.verticalline--header {
  width: 1px;
  height: 2rem;
  background: #8A8A8A;
  position: fixed;
  margin-top: 2rem;
  z-index: 1000;
  right: 3rem;
}

.menu {
  width: 16px;
  height: 16px;
  position: fixed;
  z-index: 1000;
  top: 1.6rem;
  right: 2.6rem;
  cursor: pointer;
}


.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  // width: 120px;
  background-color: black;
  font-size: .8rem;
  color: #fff;
  text-align: center;
  margin-left: .5rem;
  padding: 5px 4px;
  border-radius: 6px;
  white-space: nowrap;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.one__thirdcontainer {
  z-index: 100;
  width: calc(100vw - 5rem);
  position: absolute;
  left: 2rem;
  top: 2rem;
  border-left: 1px solid #4F23FF;
}

.simple-range-slider {
  border-bottom: 1px dotted white !important;
  background: none !important;
  height: 0px !important;
}

.simple-range-slider-bg-bar {
  background: none !important;
}


.input-wrapper input {
  margin-top: 1rem !important;
  border: none !important;
  border-radius: 0 !important;
  font-family: 'Flaco' !important;
  outline: none !important;
  box-shadow: none !important;
  border: none;
  background: white;
  height: 2rem;
  margin-top: -1px;
  border-top: 1px solid #474747;
  border-bottom: 1px solid #8A8A8A;
  font-family: 'Flaco';
  font-size: 1rem;
  color: black;
  padding-left: 2.5rem !important;
  background-image: url('./assets/icons/play.svg') !important;
  background-repeat: no-repeat !important;
  background-size: 13px !important;
  background-position: 15px 8px !important;
}

.suggest-item {
  font-family: 'Flaco';
  font-size: .8rem;
}

.suggest-item:hover {
  background: #333 !important;
}

// Tables
.vgt-table.nocturnal.bordered, .vgt-table.nocturnal.bordered td {
  border: 1px dotted #8a8a8a !important;
}

.vgt-table.nocturnal {
  color: white !important;
}

.vgt-table.nocturnal {
  background: black !important;
}

.vgt-table.nocturnal thead th {
  background-color: black;
  background-image: url('./assets/etch.svg') !important;
  background-size: cover !important;
}

</style>
