<template>
  <div class="noresults">
    <h2>{{text}}</h2>
  </div>
</template>

<script>
export default {
  name: 'NoResults',
  props: ['text']
}
</script>

<style lang="scss" scoped>
.noresults {
  width: 100%;
  height: calc(100vh);
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  font-family: 'Flaco';
  color: white;
  font-weight: 100;
}
</style>