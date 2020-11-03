<template>
  <header>
    <input 
      class="searchinput"
      v-model="keyword" 
      v-on:keyup.enter="performSearch"
      placeholder="search">
  </header>
</template>

<script>
export default {
  name: 'Searchbar',
  data: function() {
    return {
      keyword: ""
    }
  },
  methods: {
    performSearch() {
      this.$router.push(`/search/q/${this.keyword}/cat/qanon,altright,althealth,breadtube,conspiracy,marxism/sort/desc`)
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../styles/searchbar';

</style>