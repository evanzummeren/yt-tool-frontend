<template>
  <div class="ngram">
    <div class="barcontainer">
      <div 
        class="bar" 
        v-for="index in 200" 
        :key="index"
        :style="{ marginTop: index * 10 + 'px', width: index * .5 + 'px'}">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ngram'
}
</script>

<style lang="scss" scoped>
.ngram {
  width: 5rem;
  height: calc(100vh - 4rem);
  border-left: 1px dotted #8A8A8A;
  position: fixed;
  z-index: 1;
  right: 0;
  top: 4rem;
  overflow-y: scroll;
  scrollbar-width: none;
}

.ngram::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background: transparent;
}

.barcontainer {
  margin-top: 2rem;
  width: 5rem;
  height: calc(100vh - 6rem);
  position: relative;
  // display: flex;
  // flex-wrap: nowrap;
  // flex-direction: column;
}

.bar {
  background: #333;
  width: 3rem;
  height: 5px;
  margin-top: 3px;
  right: 0;
  position: absolute;
  
}
</style>