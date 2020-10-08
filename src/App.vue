<template>
  <div id="app">
    <Header/>
    <router-view/>

    <div class="footer__menu">
      <ul class="sidenav">
        <router-link to="/search/q/epstein/cat/qanon"><li class="diamond--active">Video search</li></router-link>
        <li class="diamond">Comments</li>
        <li class="diamond">Notifications</li>
      </ul>
    </div>



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
  height: 200px;
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

</style>
