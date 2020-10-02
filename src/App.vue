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
</style>
