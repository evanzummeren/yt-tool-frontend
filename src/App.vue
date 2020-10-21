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

    <router-view/>

    <div class="footer__menu">
      <ul class="sidenav">
        <router-link to="/search/q/epstein/cat/qanon,altright,althealth,breadtube,conspiracy,marxism/sort/desc">
          <li v-bind:class="{ 'diamond--active': currentActive === 'search', 'diamond': true }" 
              @click="switchActive('search')">Video search</li>
        </router-link>
          <li v-bind:class="{ inset: !text, 'inset--active': text }" v-if="currentActive === 'search'" @click="triggerText()">Text</li>
          <li v-bind:class="{ inset: !vis, 'inset--active': vis }" v-if="currentActive === 'search'" @click="triggerVis()">Visualisation</li>
        <li class="diamond" @click="switchActive('comments')">Comments</li>
        <li class="diamond">Notifications</li>
      </ul>
    </div>

  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sidemenu from './components/Sidemenu.vue';
import { bus } from './main.js'

export default {
  name: 'App',
  components: {Header, Sidemenu},
  data: function() {
    return {
      currentActive: "search",
      text: true,
      vis: false,
      insetActive: "text",
      sidemenu: false
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss">
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
  border-left: 1px solid #4F23FF;
  border-right: 1px solid #8A8A8A;
}

@font-face {
  font-family: "Flaco";
  src: url("./assets/fonts/fl-mono.woff") format("woff");
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
  background-color: black !important;
}

.vc-text-gray-200 {
  color: #B2B2B2 !important;
  font-family: 'Flaco' !important;
}

.vc-text-gray-100 {
  color: white !important;
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
  background: linear-gradient(192deg, rgba(29,29,29,0) 0%, rgba(29,29,29,1) 81%, rgba(29,29,29,1) 100%);
  z-index: 1000;
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


</style>
