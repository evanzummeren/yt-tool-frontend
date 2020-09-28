<template>
  <div class="home">
    <input 
      v-model="message" 
      v-on:keyup.enter="performSearch"
      placeholder="search">

  </div>
</template>

<script>
import ElasticCall from '../mixins/elastic-call.js';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  // components: {
  //   HelloWorld
  // },
  mixins: [ElasticCall],
  data: function() {
    return {
      message: ""
    }
  },
  beforeCreate: function() {
    console.log(this.$route.params);
  },
  mounted: function() {
    this.apiCall();
  },
  methods: {
    performSearch() {
      console.log(this.message)
      this.$router.push(`../../../../search/q/${this.message}/cat/blabla`)

    }
  }
}
</script>

<style lang="scss" scoped>

</style>