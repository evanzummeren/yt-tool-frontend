<template>
  <div id="app">
    <Header/>
    <div id="nav">
      <router-link to="/search/q/keyword/cat/all">Search</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {Header}
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  background: linear-gradient(180deg, rgba(29,29,29,1) 45%, rgba(79,35,255,1) 45%, rgba(79,35,255,1) 70%, rgba(29,29,29,1) 70%);
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
</style>
