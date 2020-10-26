<template>
  <div class="container smaller">
    <Searchbar />
    <div class="searchqueryheading">
      <h2>type in a search query</h2></div>
    <div class="searchqueryheading secondline">or try one of these example queries
      <ul>
        <li><router-link to="/search/q/reptilians/cat/qanon,altright,althealth,breadtube,conspiracy,marxism/sort/desc">reptilians</router-link></li>
        <li><router-link to='/search/q/"go%20live%20in"/cat/qanon,altright,althealth,breadtube,conspiracy,marxism/sort/desc'>"go live in"</router-link></li>
        <li><router-link to='/search/q/"biblical%20times"/cat/qanon,altright,althealth,breadtube,conspiracy,marxism/sort/desc'>"biblical times"</router-link></li>
        <li><router-link to='/search/q/"the%20truth%20there"~3/cat/qanon,altright,althealth,breadtube,conspiracy,marxism/sort/desc'>"the truth there"~3</router-link></li>
        <li><router-link to='/search/q/"q%20says"/cat/qanon,altright,althealth,breadtube,conspiracy,marxism/sort/desc'>"q says"</router-link></li>
      </ul>
      more relevant right now
    </div>
  </div>
</template>

<script>
import Searchbar from '../components/Searchbar.vue';

export default {
  name: 'Home',
  components: {
    Searchbar
  }
}
</script>

<style lang="scss" scoped>
a {
  color: white;
}
.smaller {
  min-height: calc(100vh - 2rem) !important;
}
.searchqueryheading {
  margin-top: 49px;
  margin-left: 3rem;
  font-family: 'Gil';
  color: #B2B2B2;
  font-size: 1.25rem;
  padding-left: .75rem;
  height: 100px;
  border-left: 1px solid #464646;
}

h2 {
  font-family: 'Gil';
  color: #B2B2B2;
  font-size: 1.25rem;
  font-weight: 100;
  margin-top: 75px;
  position: absolute;
}

.secondline {
  border-left: none;
  margin-top: 5px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-top: 1rem;
}

li {
  font-family: 'Flaco';
  font-size: 1rem;
  color: white;
  margin-top: .5rem;
}
</style>